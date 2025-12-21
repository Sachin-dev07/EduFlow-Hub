import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const users = [
  { name: "Michael Chen", email: "teacher.monu@mail.com", password: "123456", role: "teacher" },
  { name: "David Rodriguez", email: "teacher.raj@mail.com", password: "123456", role: "teacher" },
  { name: "Alex Thompson", email: "std.ankit@mail.com", password: "123456", role: "student" },
  { name: "James Williams", email: "std.satyam@mail.com", password: "123456", role: "student" },
  { name: "Sophia Martinez", email: "std.priya@mail.com", password: "123456", role: "student" },
  { name: "Robert Johnson", email: "parent.pramod@mail.com", password: "123456", role: "parent" },
  { name: "Patricia Garcia", email: "parent.mohan@mail.com", password: "123456", role: "parent" },
  { name: "Admin", email: "admin@mail.com", password: "123456", role: "teacher" },
  { name: "Guardian", email: "guardian1@mail.com", password: "123456", role: "parent" },
  { name: "Daniel Kim", email: "std.saurab@mail.com", password: "123456", role: "student" },
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    console.log("Old users removed");

    // Hash passwords for all users
    const hashedUsers = await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
      }))
    );

    await User.insertMany(hashedUsers);
    console.log("Users inserted successfully!");

    process.exit();
  } catch (err) {
    console.error("Seeder error:", err);
    process.exit(1);
  }
}

seedUsers();
