import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    updateProfile,
    getStudents,
    getTeachers,
    createStudent,
    createTeacher,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

const router = express.Router();

// GET USERS
router.get("/students", protect, getStudents);
router.get("/teachers", protect, getTeachers);

// CREATE USERS (Admin only)
router.post("/students", protect, createStudent);
router.post("/teachers", protect, createTeacher);

// UPDATE USER (Admin only)
router.put("/:id", protect, updateUser);

// DELETE USER (Admin only)
router.delete("/:id", protect, deleteUser);

// UPDATE USER PROFILE
router.put("/profile", protect, updateProfile);

export default router;
