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

const wipeData = async () => {
    try {
        await connectDB();

        console.log("⚠️  Wiping all data from the database...");

        await User.deleteMany({});
        await Course.deleteMany({});
        await Assignment.deleteMany({});
        await Event.deleteMany({});
        await Message.deleteMany({});
        await Resource.deleteMany({});

        console.log("✅ All data removed.");

        // Create one default Admin so the system isn't completely locked out
        console.log("Creating default Admin user...");
        await User.create({
            name: "System Admin",
            email: "admin@eduflow.com",
            password: "password123",
            role: "admin",
            bio: "Main Administrator",
            phone: "0000000000"
        });
        console.log("✅ Default Admin created: admin@eduflow.com / password123");

        process.exit();
    } catch (error) {
        console.error("Error wiping data:", error);
        process.exit(1);
    }
};

wipeData();
