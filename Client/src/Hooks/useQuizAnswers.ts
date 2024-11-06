import { useState } from "react";
import { UserAnswer } from "../types/type";

export const useQuizAnswer = () => {
  const [userAns, setUserAnswer] = useState<UserAnswer[]>([]);

  const addAnswer = (
    question: string,
    answerMarked: string,
    correctAnswer: string
  ) => {
    const newRecord = { question, answerMarked, correctAnswer };
    setUserAnswer((prev) => [...prev, newRecord]);
  };

  return { userAns, addAnswer };
};
