import User from "../models/User.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("-password");

    // Fetch courses for these teachers to determine their "Subject"
    // Since we don't have a direct 'subject' field on user, we infer from their courses
    const teachersWithSubjects = await Promise.all(teachers.map(async (teacher) => {
      const course = await mongoose.model("Course").findOne({ teacher: teacher._id });
      return {
        ...teacher.toObject(),
        subject: course ? course.subject : "General Education" // Default if no course
      };
    }));

    res.json(teachersWithSubjects);
  } catch (error) {
    console.error("Get teachers error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create student
export const createStudent = async (req, res) => {
  try {
    const { name, email, password, grade } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password || "student123", 10);

    // Create student
    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      grade
    });

    res.status(201).json({
      id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      grade: student.grade
    });
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create teacher
export const createTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password || "teacher123", 10);

    // Create teacher
    const teacher = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "teacher"
    });

    res.status(201).json({
      id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      role: teacher.role
    });
  } catch (error) {
    console.error("Create teacher error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = req.user._id || req.user.id;
    console.log('UPDATE PROFILE -- userId:', userId);
    console.log('UPDATE PROFILE -- body:', req.body);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.phone = req.body.phone ?? user.phone;
    user.bio = req.body.bio ?? user.bio;

    await user.save();
    console.log('User updated successfully');

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error('UPDATE PROFILE ERROR:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

// Update user (Admin only)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, grade, role } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = email;
    }
    if (grade !== undefined) user.grade = grade;
    if (role) user.role = role;

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      grade: user.grade
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting admin users
    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot delete admin users" });
    }

    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: error.message });
  }
};

