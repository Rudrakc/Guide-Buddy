import OpenAIApi from "openai";
import * as fs from "fs";
import Env from "../env.js";

const openai = new OpenAIApi({
  apiKey: Env.OPENAI_API_KEY,
});

const quizSchema = {
  name: "quiz_schema",
  schema: {
    type: "object",
    properties: {
      sections: {
        type: "array",
        items: {
          type: "object",
          properties: {
            sectionTitle: {
              type: "string",
              description: "The title of the section",
            },
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: {
                    type: "string",
                    description: "The quiz question",
                  },
                  choices: {
                    type: "array",
                    items: { type: "string" },
                    description: "Array of answer choices (e.g., [A, B, C, D])",
                  },
                  correctAnswer: {
                    type: "string",
                    description: "Correct choice from the array",
                  },
                },
                required: ["question", "choices", "correctAnswer"],
                additionalProperties: false,
              },
            },
          },
          required: ["sectionTitle", "questions"],
          additionalProperties: false,
        },
      },
    },
    additionalProperties: false,
  },
};

// Function to send content to OpenAI for segmentation and quiz creation
export const generateQuiz = async (content: string) => {
  try {
    const prompt = `
      Segment the following content into its most important sections.
      Then, for each section, create multiple-choice questions with options and a correct answer.
      
      Return the output in a JSON structure:
      Content:
      ${content}
    `;

    // Send request to OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You take the content provided by the user and break it into segments and generate quizzes according to it.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_schema", json_schema: quizSchema },
    });

    const quizData = response.choices[0].message?.content;

    return quizData;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

export interface UserAnswer {
  question: string;
  answerMarked: string;
  correctAnswer: string;
}

export const generateFeedback = async (userAnswers : UserAnswer[]) => {
  try 
  {
    const formattedUserAnswers = JSON.stringify(userAnswers, null, 2);
    const prompt = `
      I give an array of obj containing question, correct answer, ans marked by user.
      You have to provide feedback for the user and giving him further topics to read or topics which he has to revise.
      Keep it to the point and consise no need to explain every ans.
      The answers marked by the users:
      ${formattedUserAnswers}
    `;

    // Send request to OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that provides feedback on quiz responses.",
        },
        { role: "user", content: prompt },
      ],
    });

    const feedback = response.choices[0].message?.content;

    return feedback;
  } catch (error) {
    console.error("Error generating feedback:", error);
    throw error;
  }
};
