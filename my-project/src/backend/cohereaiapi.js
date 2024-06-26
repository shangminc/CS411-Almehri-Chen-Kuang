// src/backend/cohereaiapi.js
import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";
dotenv.config({ path: "./src/keys.env" });
const cohere = new CohereClient({
  token: process.env.COHEREAPI_TOKEN, // Ensure the environment variable is properly set
});

async function summarizeText(text) {
  try {
    const response = await cohere.summarize({
      text: text,
      length: "long",
      format: "paragraph",
      model: "summarize-xlarge",
      temperature: 0.3,
    });

    // sometimes cohere just wont return a summary (maybe inappropriate input),
    // (or < 250 words) heres error checking
    if (response.summary) {
      return response.summary;
    } else {
      console.error("Summary not available:", response);
      return `Failed to summarize, please check the response for details.`;
    }
  } catch (error) {
    console.error("Error during summarization:", error);
    return "An error occurred during summarization.";
  }
}

export { summarizeText };
