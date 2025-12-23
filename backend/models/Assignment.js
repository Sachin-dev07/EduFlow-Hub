import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    dueDate: { type: String, required: true },
    status: { type: String, default: "upcoming" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    submissions: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        grade: { type: Number, default: null },
        status: { type: String, default: "pending" }, // pending, submitted, graded
        submittedAt: { type: Date },
        feedback: { type: String }
      }
    ]
  },

  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);
