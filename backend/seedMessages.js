import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Message from "./models/Message.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedMessages = async () => {
    try {
        await connectDB();

        console.log("Seeding Messages...");

        // Find the main parent user we use for demos
        const parent = await User.findOne({ email: "parent1@eduflow.com" });
        if (!parent) {
            console.log("Parent1 not found, cannot seed messages. Please run 'node seeder.js' first.");
            process.exit(1);
        }

        // Find all teachers
        const teachers = await User.find({ role: "teacher" });
        if (teachers.length === 0) {
            console.log("No teachers found.");
            process.exit(1);
        }

        // Clear existing messages for this parent to avoid duplicates if re-run
        await Message.deleteMany({
            $or: [{ sender: parent._id }, { receiver: parent._id }]
        });

        const sampleDialogues = [
            {
                msgs: [
                    { sender: "parent", content: "Hello, I wanted to ask about the upcoming field trip." },
                    { sender: "teacher", content: "Hi! Yes, the field trip is next Tuesday. Permission slips are due tomorrow." },
                    { sender: "parent", content: "Great, I'll send it in with my child tomorrow. Thanks!" }
                ]
            },
            {
                msgs: [
                    { sender: "teacher", content: "Just a heads up, your child did excellent on the recent project!" },
                    { sender: "parent", content: "That is wonderful news! Thank you for letting me know." }
                ]
            },
            {
                msgs: [
                    { sender: "parent", content: "Is there any extra credit work available?" },
                    { sender: "teacher", content: "I can assign some extra reading if you'd like." }
                ]
            },
            {
                msgs: [
                    { sender: "teacher", content: "Please sign the progress report sent home today." },
                    { sender: "parent", content: "Will do. Thanks." }
                ]
            }
        ];

        for (let i = 0; i < teachers.length; i++) {
            const teacher = teachers[i];
            // Pick a random dialogue set or rotate
            const dialogue = sampleDialogues[i % sampleDialogues.length];

            // Spread messages out in time
            let baseTime = new Date();
            baseTime.setHours(baseTime.getHours() - (i + 1) * 24); // Back in time

            for (const msg of dialogue.msgs) {
                baseTime.setMinutes(baseTime.getMinutes() + 10); // 10 mins apart

                const senderId = msg.sender === "parent" ? parent._id : teacher._id;
                const receiverId = msg.sender === "parent" ? teacher._id : parent._id;

                await Message.create({
                    sender: senderId,
                    receiver: receiverId,
                    content: msg.content,
                    isRead: true,
                    createdAt: new Date(baseTime) // Mongoose timestamps usually auto-set, but we might want to override? Actually mongoose won't let us easily override createdAt on creation unless we disable timestamps or update. 
                    // Let's just create them, they will all be "Just now" basically, but that's fine for "showing some conversation".
                    // Update: Mongoose accepts dates in creation if schema allows or we can updateMany after. 
                    // Let's just accept they are "Just now" for simplicity or try to set it.
                });
            }
        }

        console.log("Messages Seeded Successfully for Parent1!");
        process.exit();
    } catch (error) {
        console.error("Error seeding messages:", error);
        process.exit(1);
    }
};

seedMessages();
