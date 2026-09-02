import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat.js";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { initSocket } = useChat();

  useEffect(() => {
    const socket = initSocket();
    console.log("Current user:", user); // Log the current user to the console

    return () => socket.disconnect();
  }, [user]);

  return <div>Dashboard</div>;
};

export default Dashboard;
