import Assignment from "../models/Assignment.js";

// GET ALL ASSIGNMENTS
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({})
      .populate("createdBy", "name email")
      .populate("submissions.student", "name email");
    return res.status(200).json(assignments);
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE ASSIGNMENT
export const createAssignment = async (req, res) => {
  try {
    const { title, subject, dueDate, status } = req.body;

    if (!title || !subject || !dueDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const assignment = await Assignment.create({
      title,
      subject,
      dueDate,
      status: status || "upcoming",
      createdBy: req.user._id,
    });

    res.status(201).json(assignment);
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE ASSIGNMENT
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if user created this assignment
    if (assignment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this assignment" });
    }

    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE ASSIGNMENT
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if user created this assignment
    if (assignment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this assignment" });
    }

    await Assignment.findByIdAndDelete(req.params.id);

    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// GRADE ASSIGNMENT
export const gradeAssignment = async (req, res) => {
  try {
    const { studentId, grade, feedback } = req.body;
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if submission exists
    const submissionIndex = assignment.submissions.findIndex(
      (s) => s.student.toString() === studentId
    );

    if (submissionIndex > -1) {
      // Update existing
      assignment.submissions[submissionIndex].grade = grade;
      assignment.submissions[submissionIndex].feedback = feedback;
      assignment.submissions[submissionIndex].status = "graded";
    } else {
      // Create new submission entry (if teacher grading without student submission)
      assignment.submissions.push({
        student: studentId,
        grade,
        feedback,
        status: "graded",
        submittedAt: new Date()
      });
    }

    await assignment.save();
    res.json(assignment);
  } catch (err) {
    console.error("Grade Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
