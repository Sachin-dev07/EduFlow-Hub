import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // IMPORTANT

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/resources", resourceRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});

const PORT = process.env.PORT || 5001;

// Only listen if run directly (not imported as a module)
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
