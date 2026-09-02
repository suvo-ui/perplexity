import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.7-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function testAi() {
  const res = await model.invoke("What is the capital of France?");
  console.log(res.content);
  return res;
}
