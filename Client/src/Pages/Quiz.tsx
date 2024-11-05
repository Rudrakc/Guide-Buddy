import { useState } from "react";
import QuizSection from "../Components/QuizSection";
import { QuizData } from "../types/type";

const Quiz = () => {
  const [quizData] = useState<QuizData>({
    sections: [
      {
        sectionTitle: "Understanding Asynchronous JavaScript",
        questions: [
          {
            question: "What does asynchronous programming in JavaScript allow?",
            choices: [
              "Code waits for each task to finish before moving on",
              "Code can move to the next task before finishing the current one",
              "Code handles multiple threads simultaneously",
              "Code processes synchronous tasks only",
            ],
            correctAnswer:
              "Code can move to the next task before finishing the current one",
          },
          {
            question:
              "What was a common challenge before Promises in handling asynchronous operations?",
            choices: [
              "Lack of browser support",
              "Complexity and readability issues due to nested callbacks",
              "Expensive computations",
              "Security vulnerabilities",
            ],
            correctAnswer:
              "Complexity and readability issues due to nested callbacks",
          },
        ],
      },
      {
        sectionTitle: "Promise Fundamentals",
        questions: [
          {
            question: "What are the three states of a Promise?",
            choices: [
              "Pending, Executing, Failed",
              "Waiting, Successful, Failed",
              "Pending, Fulfilled, Rejected",
              "Initialized, Processed, Completed",
            ],
            correctAnswer: "Pending, Fulfilled, Rejected",
          },
          {
            question:
              "Which method is used to define a callback for a fulfilled Promise?",
            choices: ["fetch", "resolve", "catch", "then"],
            correctAnswer: "then",
          },
          {
            question: "What happens when a Promise is in the 'rejected' state?",
            choices: [
              "The Promise is ignored",
              "The error is managed using the 'catch' method",
              "The code execution stops",
              "It automatically retries the operation",
            ],
            correctAnswer: "The error is managed using the 'catch' method",
          },
        ],
      },
      {
        sectionTitle: "Promise Chaining",
        questions: [
          {
            question: "What is Promise chaining used for?",
            choices: [
              "To handle multiple asynchronous operations in sequence",
              "To increase the speed of single threaded operations",
              "To ensure only synchronous code is executed",
              "To directly modify DOM elements",
            ],
            correctAnswer:
              "To handle multiple asynchronous operations in sequence",
          },
          {
            question: "What does the '.then()' method in a Promise chain do?",
            choices: [
              "Starts a callback hell",
              "Fetches data from the server",
              "Skips subsequent operations",
              "Passes return values to the next 'then()' link",
            ],
            correctAnswer: "Passes return values to the next 'then()' link",
          },
        ],
      },
      {
        sectionTitle: "Promise.all() and Promise.race()",
        questions: [
          {
            question: "What is the purpose of 'Promise.all()'?",
            choices: [
              "Checks if all promises are completed successfully or any is rejected",
              "Executes only the fastest promise",
              "Ignores all rejected promises",
              "Resolves as soon as any one promise is fulfilled",
            ],
            correctAnswer:
              "Checks if all promises are completed successfully or any is rejected",
          },
          {
            question:
              "In 'Promise.race()', what determines the result of the race?",
            choices: [
              "The total number of promises",
              "The first promise created",
              "The first promise to resolve or reject",
              "The last promise to resolve",
            ],
            correctAnswer: "The first promise to resolve or reject",
          },
        ],
      },
      {
        sectionTitle: "Async/Await",
        questions: [
          {
            question: "What does the 'async' keyword signify in a function?",
            choices: [
              "The function is immediately executed",
              "The function is only synchronous",
              "The function returns a Promise",
              "The function waits for all previous code to execute",
            ],
            correctAnswer: "The function returns a Promise",
          },
          {
            question: "How does 'await' function within 'async' functions?",
            choices: [
              "It pauses execution until the Promise is settled",
              "It speeds up promise resolution",
              "It splits the Promise into smaller parts",
              "It waits for all code to execute",
            ],
            correctAnswer: "It pauses execution until the Promise is settled",
          },
        ],
      },
      {
        sectionTitle: "Real World Usage Scenarios and Benefits",
        questions: [
          {
            question:
              "What is one primary benefit of using Promises over callbacks?",
            choices: [
              "Enhancing code readability and maintainability",
              "Increasing code complexity",
              "Enabling synchronous processing",
              "Eliminating asynchronous operations",
            ],
            correctAnswer: "Enhancing code readability and maintainability",
          },
          {
            question: "What structure does callback hell resemble?",
            choices: [
              "A linear path",
              "A pyramid",
              "A circular loop",
              "A straight line",
            ],
            correctAnswer: "A pyramid",
          },
        ],
      },
    ],
  });

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleSectionToggle = (sectionTitle: string) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Quiz Sections</h1>
        <div className="space-y-4">
          {quizData.sections.map((section, index) => (
            <QuizSection
              key={index}
              section={section}
              sectionIndex={index}
              expandedSection={expandedSection}
              onSectionToggle={handleSectionToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
