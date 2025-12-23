import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCourse, updateCourse } from "@/api/courseApi";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  courseToEdit?: any;
}

const CreateCourseModal = ({ open, onClose, onCreated, courseToEdit }: Props) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    title: "",
    subject: "",
    students: 0,
    progress: 0,
    lessons: 0,
    duration: "",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseToEdit) {
      setForm({
        title: courseToEdit.title || "",
        subject: courseToEdit.subject || "",
        students: courseToEdit.students?.length || 0,
        progress: courseToEdit.progress || 0,
        lessons: courseToEdit.lessons || 0,
        duration: courseToEdit.duration || "",
        color: courseToEdit.color || "bg-gradient-to-br from-blue-500 to-blue-600",
      });
    } else {
      setForm({
        title: "",
        subject: "",
        students: 0,
        progress: 0,
        lessons: 0,
        duration: "",
        color: "bg-gradient-to-br from-blue-500 to-blue-600",
      });
    }
  }, [courseToEdit, open]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.subject) {
      toast({
        title: "Validation Error",
        description: "Title and subject are required!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (courseToEdit) {
        await updateCourse(courseToEdit._id, form);
        toast({ title: "Success", description: "Course updated successfully!" });
      } else {
        await createCourse(form);
        toast({ title: "Success", description: "Course created successfully!" });
      }

      onCreated();
      onClose();
    } catch (err: any) {
      console.error("Save course error:", err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to save course.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle>{courseToEdit ? "Edit Course" : "Create New Course"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input name="title" value={form.title} placeholder="Course Title" onChange={handleChange} />
          <Input name="subject" value={form.subject} placeholder="Subject" onChange={handleChange} />
          <Input name="lessons" value={form.lessons} type="number" placeholder="Lessons Count" onChange={handleChange} />
          <Input name="progress" value={form.progress} type="number" placeholder="Progress %" onChange={handleChange} />
          <Input name="students" value={form.students} type="number" placeholder="Number of Students" onChange={handleChange} />
          <Input name="duration" value={form.duration} placeholder="Duration (e.g. 6 weeks remaining)" onChange={handleChange} />
          <Input name="color" value={form.color} placeholder="CSS Gradient Class" onChange={handleChange} />

          <Button variant="gradient" className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? (courseToEdit ? "Updating..." : "Creating...") : (courseToEdit ? "Update Course" : "Create Course")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseModal;
