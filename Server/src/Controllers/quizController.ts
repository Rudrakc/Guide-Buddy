import express, { json, Request, Response } from "express";
import { fetchContent } from "../utils/fetchContent.js";
import { generateQuiz } from "../utils/openAI.js";

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const text = await fetchContent(url);
    let quiz = await generateQuiz(text);

    if (quiz) {
      quiz = JSON.parse(quiz);
    }

    res.status(201).json(quiz);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error in geneterating Quiz" });
  }
};

export const getFeedback = async (req: Request, res: Response) => {
    res.send("Hii get Feedback");
};
