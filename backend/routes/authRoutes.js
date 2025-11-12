import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register new user (Admin only)
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

export default router;
