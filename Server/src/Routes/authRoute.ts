import express, { Request, Response } from "express";
import {
  login,
  signup,
  validateToken,
} from "../Controllers/authController.js";

const router = express.Router();

router.post("/signup", (req: Request, res: Response) => signup(req, res));
router.post("/login", (req: Request, res: Response) => login(req, res));
router.post("/validate", (req: Request, res: Response) => validateToken(req, res));

export default router;
