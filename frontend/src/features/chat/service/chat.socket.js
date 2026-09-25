import { io } from "socket.io-client";

export const initSocketClient = () => {
  const socket = io(import.meta.env.VITE_API_URL, {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to server with ID:", socket.id);
  });

  return socket;
};
