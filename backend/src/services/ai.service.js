import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const geminiTitleModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.2,
  maxOutputTokens: 24,
});

export async function generateResponse(messages) {
  const formattedMessages = messages
    .map((msg) => {
      const content = String(msg.content ?? "").trim();
      if (!content) return null;

      if (msg.role === "user") return new HumanMessage(content);
      if (msg.role === "ai") return new AIMessage(content);
      return null;
    })
    .filter(Boolean);

  if (!formattedMessages.length) {
    throw new Error("Cannot generate a response without a valid message");
  }

  const res = await geminiModel.invoke(formattedMessages);
  return res;
}

export async function generateChatTitle(message) {
  const systemMessage = new SystemMessage(
    `You are a helpful assistant that generates concise and relevant titles for chat conversations.

    User will provide a message, and your task is to generate a title that accurately reflects the content of the message. The title should be clear, informative, and relevant to the message provided.
    `,
  );

  const res = await geminiTitleModel.invoke([
    systemMessage,
    new HumanMessage(
      `Generate a title for the following message: "${message}". The title should be concise, clear, and relevant to the content of the message. Please provide only the title without any additional text or explanation.`,
    ),
  ]);
  return res;
}
