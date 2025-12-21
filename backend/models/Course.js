import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, default: "" },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  students: { type: Number, default: 0 }, // Count, not array (simplified)
  progress: { type: Number, default: 0 }, // Progress percentage
  lessons: { type: Number, default: 0 }, // Number of lessons
  duration: { type: String, default: "" }, // e.g., "6 weeks remaining"
  color: { type: String, default: "bg-gradient-to-br from-blue-500 to-blue-600" },
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
