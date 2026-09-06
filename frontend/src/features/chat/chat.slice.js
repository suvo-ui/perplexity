import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },

  reducers: {
    createNewChat: (state, action) => {
      const { newChatId, title } = action.payload;
      const existingChat = state.chats[newChatId];

      state.chats[newChatId] = {
        ...existingChat,
        _id: newChatId,
        title,
        messages: existingChat?.messages || [],
        lastUpdated: new Date().toISOString(),
      };
    },
    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages.push({
          content,
          role,
        });
      }
    },
    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].messages = messages;
      }
    },
    removeChat: (state, action) => {
      delete state.chats[action.payload];
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setIsLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages,
  removeChat,
} = chatSlice.actions;

export default chatSlice.reducer;
