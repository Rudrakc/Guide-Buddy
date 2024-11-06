import fetch from "node-fetch";
import { htmlToText } from "html-to-text";

/**
 * Fetches the main content of an article from a given URL and returns it as a string.
 * @param url - The URL of the article to fetch.
 * @returns The main content of the article.
 */
export const fetchContent = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36", // Mimicking a browser
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8", // Accept HTML responses
        "Accept-Encoding": "gzip, deflate, br", // Handle compressed responses
        "Connection": "keep-alive",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the article: ${response.statusText}`);
    }

    const html = await response.text();

    const textConfig = {
      wordwrap: 130,
      selectors: [{ selector: "a", options: { ignoreHref: true } }],
    };

    // Converting the HTML to plain text
    const text = htmlToText(html, textConfig);

    return text;
  } catch (error) {
    console.error("Error fetching article content:", error);
    throw new Error("Could not fetch or parse article content.");
  }
};
