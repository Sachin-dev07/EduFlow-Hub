import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createStudent, updateUser, StudentData } from "@/api/userApi";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().optional(),
    grade: z.string().optional(),
});

interface CreateStudentModalProps {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
    studentToEdit?: any;
}

export default function CreateStudentModal({ open, onClose, onCreated, studentToEdit }: CreateStudentModalProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<StudentData>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (studentToEdit) {
            setValue("name", studentToEdit.name);
            setValue("email", studentToEdit.email);
            setValue("grade", studentToEdit.grade || "");
            // Password logic: Optional for edit, required for create (handled by schema if I strictly separate, 
            // but for now relying on backend to not require password on update)
        } else {
            reset({
                name: "",
                email: "",
                grade: "",
                password: ""
            });
        }
    }, [studentToEdit, open, setValue, reset]);

    const onSubmit = async (data: StudentData) => {
        setLoading(true);
        try {
            if (studentToEdit) {
                await updateUser(studentToEdit._id, data);
                toast({
                    title: "Success",
                    description: "Student updated successfully",
                });
            } else {
                if (!data.password) {
                    // Basic client-side validation for password on create since I relaxed the schema
                    toast({ variant: "destructive", title: "Error", description: "Password is required for new students" });
                    setLoading(false);
                    return;
                }
                await createStudent(data);
                toast({
                    title: "Success",
                    description: "Student added successfully",
                });
            }
            reset();
            onCreated();
            onClose();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.response?.data?.message || `Failed to ${studentToEdit ? 'update' : 'add'} student`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-white/20 shadow-2xl">
                <DialogHeader>
                    <DialogTitle>{studentToEdit ? "Edit Student" : "Add New Student"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" {...register("name")} placeholder="John Doe" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} placeholder="student@example.com" />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">{studentToEdit ? "New Password (leave blank to keep current)" : "Default Password"}</Label>
                        <Input id="password" type="password" {...register("password")} placeholder={studentToEdit ? "Unchanged" : "Required"} />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="grade">Grade / Class</Label>
                        <Input id="grade" {...register("grade")} placeholder="e.g. 10th Grade" />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (studentToEdit ? "Updating..." : "Adding...") : (studentToEdit ? "Update Student" : "Add Student")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
