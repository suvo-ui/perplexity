import { initSocketClient } from "../service/chat.socket.js";

export function useChat() {
  return {
    initSocket: initSocketClient,
  };
}
