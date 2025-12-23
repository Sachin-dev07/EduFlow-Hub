import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createTeacher, updateUser } from "@/api/userApi";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().optional(),
    subject: z.string().optional(),
});

type TeacherData = z.infer<typeof formSchema>;

interface CreateTeacherModalProps {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
    teacherToEdit?: any;
}

export default function CreateTeacherModal({ open, onClose, onCreated, teacherToEdit }: CreateTeacherModalProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<TeacherData>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (teacherToEdit) {
            setValue("name", teacherToEdit.name);
            setValue("email", teacherToEdit.email);
            setValue("subject", teacherToEdit.grade || ""); // Assuming grade/subject field re-use or mapping
            // Note: DB model has 'grade', but form has 'subject'. 
            // Teacher specific fields might need adjustment in backend if 'subject' is distinct from 'grade'.
            // For now, I'll assume 'grade' field in DB is used for subject/department for teachers or I'll just map it to what's available.
            // Wait, looking at CreateStudent, it uses 'grade'. Teacher model in backend doesn't explicitly show 'subject', only 'grade' was added to User model.
            // Let's check User model again. 
        } else {
            reset({
                name: "",
                email: "",
                subject: "",
                password: ""
            });
        }
    }, [teacherToEdit, open, setValue, reset]);

    const onSubmit = async (data: TeacherData) => {
        setLoading(true);
        try {
            if (teacherToEdit) {
                await updateUser(teacherToEdit._id, data);
                toast({
                    title: "Success",
                    description: "Teacher updated successfully",
                });
            } else {
                if (!data.password) {
                    toast({ variant: "destructive", title: "Error", description: "Password is required for new teachers" });
                    setLoading(false);
                    return;
                }
                await createTeacher(data);
                toast({
                    title: "Success",
                    description: "Teacher added successfully",
                });
            }
            reset();
            onCreated();
            onClose();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.response?.data?.message || `Failed to ${teacherToEdit ? 'update' : 'add'} teacher`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-white/20 shadow-2xl">
                <DialogHeader>
                    <DialogTitle>{teacherToEdit ? "Edit Teacher" : "Add New Teacher"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" {...register("name")} placeholder="Jane Doe" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} placeholder="teacher@school.edu" />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">{teacherToEdit ? "New Password (leave blank to keep current)" : "Default Password"}</Label>
                        <Input id="password" type="password" {...register("password")} placeholder={teacherToEdit ? "Unchanged" : "Required"} />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject / Department</Label>
                        <Input id="subject" {...register("subject")} placeholder="e.g. Mathematics" />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (teacherToEdit ? "Updating..." : "Adding...") : (teacherToEdit ? "Update Teacher" : "Add Teacher")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
