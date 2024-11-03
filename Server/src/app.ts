import express from "express";
import { fetchContent } from "./utils/fetchContent.js";
import * as fs from "fs";

const app = express();
const port = 8800;

export const parseArticle = async () => {
  const url =
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise";

  try {
    // Fetch and segment the article content
    const content = await fetchContent(url);

    fs.writeFile("file.txt", content, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  } catch (error) {
    console.error("Error parsing the content:", error);
  }
};
parseArticle();

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
