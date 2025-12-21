import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateProfile } from "../controllers/userController.js";

const router = express.Router();

// UPDATE USER PROFILE
router.put("/profile", protect, updateProfile);

export default router;
