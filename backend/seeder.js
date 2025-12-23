import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Course from "./models/Course.js";
import Assignment from "./models/Assignment.js";
import Event from "./models/Event.js";
import Message from "./models/Message.js";
import Resource from "./models/Resource.js";
import connectDB from "./config/db.js";

dotenv.config();

const indianNames = {
    male: ["Aarav", "Vihaan", "Aditya", "Arjun", "Sai", "Reyansh", "Aryan", "Krishna", "Ishaan", "Shaurya", "Rohan", "Vikram", "Rahul", "Amit", "Suresh"],
    female: ["Aadya", "Diya", "Saanvi", "Ananya", "Myra", "Kiara", "Pari", "Riya", "Aadhya", "Fatima", "Priya", "Neha", "Sneha", "Kavita", "Pooja"],
    parentMale: ["Rajesh", "Mukesh", "Sanjay", "Manoj", "Anil", "Sunil", "Ramesh", "Vijay", "Ashok", "Alok"],
    parentFemale: ["Sunita", "Anita", "Geeta", "Seema", "Rekha", "Meena", "Suman", "Kiran", "Lata", "Usha"],
    surnames: ["Sharma", "Verma", "Patel", "Singh", "Gupta", "Kumar", "Yadav", "Das", "Rao", "Jha", "Mishra", "Reddy", "Nair", "Iyer"]
};

// Helper to pick random element
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedData = async () => {
    try {
        await connectDB();

        console.log("Clearing existing data...");
        await User.deleteMany({});
        await Course.deleteMany({});
        await Assignment.deleteMany({});
        await Event.deleteMany({});
        await Message.deleteMany({});
        await Resource.deleteMany({});

        console.log("Creating Users...");

        // Create Admin
        const admin = await User.create({
            name: "Admin User",
            email: "admin@eduflow.com",
            password: "password123",
            role: "admin",
            bio: "Administrator of EduFlow Hub",
            phone: "9876543210"
        });

        // Create 7 Teachers
        const teachers = [];
        for (let i = 1; i <= 7; i++) {
            const gender = Math.random() > 0.5 ? 'male' : 'female';
            const firstName = pick(indianNames[gender]);
            const lastName = pick(indianNames.surnames);

            teachers.push(await User.create({
                name: `${firstName} ${lastName}`,
                email: `teacher${i}@eduflow.com`,
                password: "password123",
                role: "teacher",
                bio: "Experienced educator specialized in rapid learning methodologies.",
                phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`
            }));
        }

        // Create 10 Student-Parent Pairs
        const students = [];
        const parents = [];

        for (let i = 1; i <= 10; i++) {
            // 1. Pick a Surname for the family
            const surname = indianNames.surnames[i % indianNames.surnames.length];

            // 2. Create Student
            const sGender = Math.random() > 0.5 ? 'male' : 'female';
            const sFirstName = pick(indianNames[sGender]);
            const studentName = `${sFirstName} ${surname}`;

            const student = await User.create({
                name: studentName,
                email: `student${i}@eduflow.com`,
                password: "password123",
                role: "student",
                grade: ["10th", "11th", "12th"][Math.floor(Math.random() * 3)],
                bio: "Enthusiastic learner aiming for excellence.",
                phone: `8${Math.floor(100000000 + Math.random() * 900000000)}`
            });
            students.push(student);

            // 3. Create Parent for this Student
            const pGender = Math.random() > 0.5 ? 'parentMale' : 'parentFemale';
            const pFirstName = pick(indianNames[pGender]);
            const parentName = `${pFirstName} ${surname}`;

            const parent = await User.create({
                name: parentName,
                email: `parent${i}@eduflow.com`,
                password: "password123",
                role: "parent",
                bio: `Parent of ${studentName}`,
                phone: `7${Math.floor(100000000 + Math.random() * 900000000)}`
            });
            parents.push(parent);
        }

        console.log("Creating Courses...");
        const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English", "History"];
        const createdCourses = [];

        for (const teacher of teachers) {
            const subject = subjects[Math.floor(Math.random() * subjects.length)];
            const course = await Course.create({
                title: `Advanced ${subject}`,
                subject: subject,
                description: `Comprehensive guide to ${subject} concepts and applications.`,
                teacher: teacher._id,
                students: Math.floor(Math.random() * 30) + 10,
                progress: Math.floor(Math.random() * 100),
                lessons: Math.floor(Math.random() * 20) + 5,
                duration: `${Math.floor(Math.random() * 10) + 2} weeks`,
                color: "bg-gradient-to-br from-indigo-500 to-purple-600"
            });
            createdCourses.push(course);
        }

        console.log("Creating Assignments...");
        for (const course of createdCourses) {
            await Assignment.create({
                title: `${course.subject} Homework`,
                subject: course.subject,
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: "upcoming",
                createdBy: course.teacher
            });
        }

        console.log("Creating Events...");
        await Event.create({
            title: "Annual Sports Day",
            description: "All students are requested to participate.",
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            type: "General",
            createdBy: admin._id
        });

        console.log("Database Seeded Successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedData();
