import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  console.log("Current user:", user); // Log the current user to the console

  return <div>Dashboard</div>;
};

export default Dashboard;
