import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export async function sendMessageController(req, res) {
  // Implementation for sending a message

  const { message, chatId } = req.body;
  // console.log("Received message:", message);

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      message: "Message is required",
      success: false,
    });
  }

  let chat = null;
  let chatTitle = null;

  // generate a title for the chat based on the message
  if (!chatId) {
    chatTitle = await generateChatTitle(message);
    chat = await Chat.create({
      user: req.user.id,
      title: chatTitle.content,
    });
  }

  const activeChatId = chatId || chat._id;

  const userMessage = await Message.create({
    chat: activeChatId,
    content: message.trim(),
    role: "user",
  });

  const messages = await Message.find({ chat: activeChatId }).sort({
    createdAt: 1,
  });
  console.log("Messages in chat:", messages);

  // Call the AI service to generate a response
  const aiResponse = await generateResponse(messages);

  const aiMessage = await Message.create({
    chat: activeChatId,
    content: aiResponse.content,
    role: "ai",
  });

  res.status(201).json({
    chatTitle: chatTitle ? chatTitle.content : null,
    chat,
    userMessage,
    aiMessage,
  });
}

export async function getChats(req,res){
  const user = req.user.id;
  const chats = await Chat.find({ user }).sort({ createdAt: -1 });
  res.status(200).json(chats);
}

export async function getMessages(req,res){
  const { chatId } = req.params;

  const chat = await Chat.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
      success: false,
    });
  }

  const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });
  res.status(200).json(messages);
}

export async function deleteChat(req, res) {
  const { chatId } = req.params;

  const chat = await Chat.findOneAndDelete({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
      success: false,
    });
  }

  await Message.deleteMany({ chat: chatId });
  res.status(200).json({
    message: "Chat deleted successfully",
    success: true,
  });
}
