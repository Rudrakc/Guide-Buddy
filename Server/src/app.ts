import express from "express";
import Env from "./env.js";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./Routes/authRoute.js"
import quizRouter from "./Routes/quizRoute.js"

const app = express();
const port = Env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);


app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
