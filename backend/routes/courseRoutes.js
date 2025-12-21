import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { 
  getCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} from "../controllers/courseController.js";

const router = express.Router();

// Get all courses (accessible by all authenticated users)
router.get("/", protect, getCourses);

// Create course (teachers only)
router.post("/", protect, authorizeRoles("teacher"), createCourse);

// Update course (teachers only)
router.put("/:id", protect, authorizeRoles("teacher"), updateCourse);

// Delete course (teachers only)
router.delete("/:id", protect, authorizeRoles("teacher"), deleteCourse);

export default router;
