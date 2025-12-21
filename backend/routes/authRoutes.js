import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	register,
	login,
	getProfile,
} from "../controllers/authController.js";
import { updateProfile } from "../controllers/userController.js";

const router = express.Router();

// Register
router.post("/signup", register);

// Login
router.post("/login", login);

// Get profile
router.get("/profile", protect, getProfile);

// Update profile
router.put("/profile", protect, updateProfile);
export default router;