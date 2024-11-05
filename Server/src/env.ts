import dotenv from "dotenv";

dotenv.config();

export default class Env {
  public static readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  public static readonly PORT = Number(process.env.PORT) || 8800;
}
