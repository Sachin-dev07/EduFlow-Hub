import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCourse } from "@/api/courseApi";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const CreateCourseModal = ({ open, onClose, onCreated }: Props) => {
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
      await createCourse(form);

      toast({
        title: "Success",
        description: "Course created successfully!",
      });

      onCreated();   // refresh courses
      onClose();     // close modal
    } catch (err: any) {
      console.error("Create course error:", err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to create course.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input name="title" placeholder="Course Title" onChange={handleChange} />
          <Input name="subject" placeholder="Subject" onChange={handleChange} />
          <Input name="lessons" type="number" placeholder="Lessons Count" onChange={handleChange} />
          <Input name="progress" type="number" placeholder="Progress %" onChange={handleChange} />
          <Input name="students" type="number" placeholder="Number of Students" onChange={handleChange} />
          <Input name="duration" placeholder="Duration (e.g. 6 weeks remaining)" onChange={handleChange} />
          <Input name="color" placeholder="CSS Gradient Class" onChange={handleChange} />

          <Button variant="gradient" className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Course"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseModal;
