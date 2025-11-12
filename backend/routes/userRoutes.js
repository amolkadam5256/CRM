import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// -------------------------
// Admin-only routes
// -------------------------

// Create a new user
router.post("/", protect, authorizeRoles("admin"), createUser);

// Get all users
router.get("/", protect, authorizeRoles("admin"), getAllUsers);

// Get a single user by ID
router.get("/:id", protect, authorizeRoles("admin"), getUserById);

// Update a user
router.put("/:id", protect, authorizeRoles("admin"), updateUser);

// Delete a user
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;
