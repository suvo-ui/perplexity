import express from "express";

import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//routes
app.use("/api/auth", authRoutes);

//health check
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

export default app;
