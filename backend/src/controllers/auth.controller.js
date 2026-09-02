import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const emailVerifiedPage = fs.readFileSync(
  path.join(__dirname, "../views/auth/email-verified.html"),
  "utf8",
);
const verificationExpiredPage = fs.readFileSync(
  path.join(__dirname, "../views/auth/verification-expired.html"),
  "utf8",
);
const verificationInvalidPage = fs.readFileSync(
  path.join(__dirname, "../views/auth/verification-invalid.html"),
  "utf8",
);


export const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email }, { username });
  if (existingUser) {
    return res.status(400).json({
      message: "User with this email or username already exists",
      success: false,
      error: "User already exists",
    });
  }
  const user = await User.create({ username, email, password });

  const emailVerificationToken = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity",
    html: `<h1>Hi ${username}, Welcome to Perplexity</h1>
    <p>Thank you for registering with Perplexity. We are excited to have you on board.</p>
    <p>Please click the link below to verify your email:</p>
    <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
    <p>If you did not create an account, please ignore this email.</p>
    <p>Best regards,<br/>The Perplexity Team</p>
    `,
  });

  res.status(201).json({
    message: "User created successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const verifyEmailController = async (req, res) => {
  const { token } = req.query;

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).send(verificationExpiredPage);
    }

    return res.status(400).send(verificationInvalidPage);
  }

  const user = await User.findOne({ email: decoded.email });

  if (user && user.verified) {
    return res.status(200).send(emailVerifiedPage);
  }

  if (!user) {
    return res.status(400).send(verificationInvalidPage);
  }

  user.verified = true;
  await user.save();

  res.status(200).send(emailVerifiedPage);
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
      success: false,
      error: "User not found",
    });
  }

  if (!user.verified) {
    return res.status(401).json({
      message:
        "Email not verified. Please verify your email before logging in.",
      success: false,
      error: "Email not verified",
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
      success: false,
      error: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const getMeController = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  res.status(200).json({
    message: "User information retrieved successfully",
    success: true,
    user,
  });
};
