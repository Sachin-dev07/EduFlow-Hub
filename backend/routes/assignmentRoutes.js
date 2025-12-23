import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  gradeAssignment
} from "../controllers/assignmentController.js";

const router = express.Router();

// Get assignments (all authenticated users can view)
router.get("/", protect, getAssignments);

// Create assignment (teachers only)
router.post("/", protect, authorizeRoles("teacher"), createAssignment);

// Update assignment (teachers only)
router.put("/:id", protect, authorizeRoles("teacher"), updateAssignment);

// Delete assignment (teachers only)
router.delete("/:id", protect, authorizeRoles("teacher"), deleteAssignment);

// Grade assignment (teachers only)
router.post("/:id/grade", protect, authorizeRoles("teacher"), gradeAssignment);

export default router;
