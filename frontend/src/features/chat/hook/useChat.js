import { initSocketClient } from "../service/chat.socket.js";
import {
  setCurrentChatId,
  setIsLoading,
  setError,
  setChats,
  createNewChat,
  addNewMessage,
  addMessages,
  removeChat,
} from "../chat.slice.js";
import {
  sendMessage,
  getMessages,
  getChats,
  deleteChat,
} from "../service/chat.api.js";
import { useDispatch } from "react-redux";

export function useChat() {
  const dispatch = useDispatch();

  async function handleSendMessage(message, chatId) {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    try {
      const data = await sendMessage(message, chatId);
      const { aiMessage, chatTitle, chat } = data;

      dispatch(
        createNewChat({ newChatId: chat._id, title: chatTitle || chat.title }),
      );
      dispatch(
        addNewMessage({ chatId: chat._id, content: message, role: "user" }),
      );
      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: aiMessage.content,
          role: aiMessage.role,
        }),
      );
      dispatch(setCurrentChatId(chat._id));
      return data;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Unable to send message"),
      );
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function handleGetChats() {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    try {
      const data = await getChats();
      const chats = Array.isArray(data) ? data : data.chats || [];

      dispatch(
        setChats(
          chats.reduce((acc, chat) => {
            acc[chat._id] = {
              _id: chat._id,
              title: chat.title,
              messages: [],
              lastUpdated: chat.updatedAt,
            };
            return acc;
          }, {}),
        ),
      );
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Unable to fetch chats"),
      );
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function handleOpenChat(chatId) {
    dispatch(setIsLoading(true));
    dispatch(setError(null));
    dispatch(setCurrentChatId(chatId));

    try {
      const data = await getMessages(chatId);
      const messages = Array.isArray(data) ? data : data.messages || [];

      const formattedMessages = messages.map((msg) => ({
        _id: msg._id,
        content: msg.content,
        role: msg.role,
      }));

      dispatch(addMessages({ chatId, messages: formattedMessages }));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Unable to fetch messages"),
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function handleDeleteChat(chatId) {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    try {
      await deleteChat(chatId);
      dispatch(removeChat(chatId));
      dispatch(setCurrentChatId(null));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Unable to delete chat"),
      );
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return {
    initSocket: initSocketClient,
    handleSendMessage,
    handleGetChats,
    handleDeleteChat,
    handleOpenChat,
  };
}
