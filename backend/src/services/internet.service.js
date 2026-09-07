import { tavily } from "@tavily/core";

const tavilyClient = new tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export const searchInternet = async (query) => {
  if (typeof query !== "string" || !query.trim()) {
    throw new Error("A search query is required");
  }

  const results = await tavilyClient.search(query, {
    maxResults: 5,
    searchDepth: "advanced",
  });

  return results;
};
