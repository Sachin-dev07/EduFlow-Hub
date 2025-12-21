import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createAssignment } from "@/api/assignmentApi";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void; // refresh list
}

const CreateAssignmentModal = ({ open, onClose, onCreated }: Props) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

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
      await createAssignment({
        title,
        subject,
        dueDate,
        status,
      });

      toast({
        title: "Success",
        description: "Assignment created successfully!",
      });

      onCreated(); // refresh parent list
      onClose(); // close modal

      // Reset form
      setTitle("");
      setSubject("");
      setDueDate("");
      setStatus("pending");

    } catch (err: any) {
      console.error("Create assignment error:", err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to create assignment.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Assignment</DialogTitle>
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
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentModal;
