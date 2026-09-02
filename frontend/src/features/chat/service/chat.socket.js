import { io } from "socket.io-client";

export const initSocketClient = () => {
  const socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to server with ID:", socket.id);
  });

  return socket;
};
