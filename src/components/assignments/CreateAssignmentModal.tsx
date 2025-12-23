import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createAssignment, updateAssignment } from "@/api/assignmentApi";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void; // refresh list
  assignmentToEdit?: any;
}

const CreateAssignmentModal = ({ open, onClose, onCreated, assignmentToEdit }: Props) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (assignmentToEdit) {
      setTitle(assignmentToEdit.title || "");
      setSubject(assignmentToEdit.subject || "");
      setDueDate(assignmentToEdit.dueDate ? new Date(assignmentToEdit.dueDate).toISOString().split('T')[0] : "");
      setStatus(assignmentToEdit.status || "pending");
    } else {
      setTitle("");
      setSubject("");
      setDueDate("");
      setStatus("pending");
    }
  }, [assignmentToEdit, open]);

  const handleCreate = async () => {
    if (!title || !subject || !dueDate) {
      toast({
        title: "Validation Error",
        description: "All fields are required!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        subject,
        dueDate,
        status,
      };

      if (assignmentToEdit) {
        await updateAssignment(assignmentToEdit._id, payload);
        toast({ title: "Success", description: "Assignment updated successfully!" });
      } else {
        await createAssignment(payload);
        toast({ title: "Success", description: "Assignment created successfully!" });
      }

      onCreated(); // refresh parent list
      onClose(); // close modal

      // Reset form if creating new (automatic via useEffect but good practice)
      if (!assignmentToEdit) {
        setTitle("");
        setSubject("");
        setDueDate("");
        setStatus("pending");
      }

    } catch (err: any) {
      console.error("Save assignment error:", err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to save assignment.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle>{assignmentToEdit ? "Edit Assignment" : "Create New Assignment"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="pending">Pending</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="grading">Grading</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate} disabled={loading} variant="gradient">
            {loading ? (assignmentToEdit ? "Updating..." : "Creating...") : (assignmentToEdit ? "Update" : "Create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentModal;
