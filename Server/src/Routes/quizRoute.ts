import express, { Request, Response } from "express";
import { getFeedback, getQuiz } from "../Controllers/quizController.js";


const router = express.Router();

router.post("/getQuiz", (req: Request, res: Response) => getQuiz(req, res));
router.post("/getFeedback", (req: Request, res: Response) => getFeedback(req, res));

export default router;
