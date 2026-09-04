import { Router } from "express";
import {
  sendMessageController,
  getChats,
  getMessages,
  deleteChat,
} from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/message", authMiddleware, sendMessageController);
router.get("/messages/:chatId", authMiddleware, getMessages);
router.get("/", authMiddleware, getChats);
router.delete("/delete/:chatId", authMiddleware, deleteChat);

export default router;
