import User from "../models/User.js";

// @desc    Get all students
// @route   GET /api/users/students
// @access  Private
export const getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" }).select("-password");
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all teachers
// @route   GET /api/users/teachers
// @access  Private
export const getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: "teacher" }).select("-password");
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const student = await User.create({
            name,
            email,
            password: password || "123456", // Default password if not provided
            role: "student",
        });

        if (student) {
            res.status(201).json({
                _id: student._id,
                name: student.name,
                email: student.email,
                role: student.role,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createTeacher = async (req, res) => {
    try {
        const { name, email, password, subject } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const teacher = await User.create({
            name,
            email,
            password: password || "123456",
            role: "teacher",
            bio: subject || "Teacher",
        });

        if (teacher) {
            res.status(201).json({
                _id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                role: teacher.role,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
