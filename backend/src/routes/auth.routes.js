import express from "express";
import {
  registerController,
  verifyEmailController,
  loginController,
  getMeController,
} from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validator/auth.validation.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
router.post("/register", registerValidation, registerController);

/**
 * @route POST /api/auth/login
 * @desc Login an existing user
 * @access Public
 * @body { email, password }
 */
router.post("/login", loginValidation, loginController);

/**
 * @route GET /api/auth/get-me
 * @desc Get current user's information
 * @access Private
 */
router.get("/get-me", authMiddleware, getMeController);

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email
 * @access Public
 * @query { token }
 */
router.get("/verify-email", verifyEmailController);

export default router;
