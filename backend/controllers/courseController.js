import Course from "../models/Course.js";

// GET all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new course
export const createCourse = async (req, res) => {
  try {
    const { title, subject, students, progress, lessons, duration, color, description } = req.body;

    const course = await Course.create({
      title,
      subject,
      students: students || 0,
      progress: progress || 0,
      lessons: lessons || 0,
      duration: duration || "",
      color: color || "bg-gradient-to-br from-blue-500 to-blue-600",
      description,
      teacher: req.user._id,
    });

    res.status(201).json(course);
  } catch (err) {
    console.error("Create course error:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user is the teacher of this course
    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this course" });
    }

    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user is the teacher of this course
    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this course" });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
