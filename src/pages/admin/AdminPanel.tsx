import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStudents, getTeachers, deleteUser } from "@/api/userApi";
import { getCourses, deleteCourse } from "@/api/courseApi";
import { getAssignments, deleteAssignment } from "@/api/assignmentApi";
import {
    Plus,
    Search,
    UserPlus,
    Users,
    GraduationCap,
    School,
    BookOpen,
    FileText,
    BarChart3,
    Settings,
    ExternalLink,
    Edit,
    Trash2,
    Eye,
    LayoutDashboard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import CreateStudentModal from "@/components/students/CreateStudentModal";
import CreateTeacherModal from "@/components/students/CreateTeacherModal";
import CreateCourseModal from "@/components/courses/CreateCourseModal";
import CreateAssignmentModal from "@/components/assignments/CreateAssignmentModal";

const AdminPanel = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [students, setStudents] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Modals
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [showTeacherModal, setShowTeacherModal] = useState(false);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showAssignmentModal, setShowAssignmentModal] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

    const fetchData = async () => {
        try {
            const [studentData, teacherData, courseData, assignmentData] = await Promise.all([
                getStudents().catch(() => []),
                getTeachers().catch(() => []),
                getCourses().catch(() => []),
                getAssignments().catch(() => [])
            ]);
            setStudents(studentData || []);
            setTeachers(teacherData || []);
            setCourses(courseData || []);
            setAssignments(assignmentData || []);
        } catch (error) {
            console.error('Admin panel data fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        fetchData();
    };

    const handleEditStudent = (student: any) => {
        setSelectedStudent(student);
        setShowStudentModal(true);
    };

    const handleEditTeacher = (teacher: any) => {
        setSelectedTeacher(teacher);
        setShowTeacherModal(true);
    };

    const handleEditCourse = (course: any) => {
        setSelectedCourse(course);
        setShowCourseModal(true);
    };

    const handleEditAssignment = (assignment: any) => {
        setSelectedAssignment(assignment);
        setShowAssignmentModal(true);
    };

    const handleDeleteUser = async (userId: string, userType: 'student' | 'teacher') => {
        if (!window.confirm(`Are you sure you want to delete this ${userType}? This action cannot be undone.`)) {
            return;
        }

        try {
            await deleteUser(userId);
            toast({
                title: "Success",
                description: `${userType.charAt(0).toUpperCase() + userType.slice(1)} deleted successfully`,
            });
            fetchData();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete user",
            });
        }
    };

    const handleDeleteCourse = async (courseId: string) => {
        if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
            return;
        }
        try {
            await deleteCourse(courseId);
            toast({
                title: "Success",
                description: "Course deleted successfully",
            });
            fetchData();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete course",
            });
        }
    };

    const handleDeleteAssignment = async (assignmentId: string) => {
        if (!window.confirm("Are you sure you want to delete this assignment?")) {
            return;
        }
        try {
            await deleteAssignment(assignmentId);
            toast({
                title: "Success",
                description: "Assignment deleted successfully",
            });
            fetchData();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete assignment",
            });
        }
    };

    const filteredStudents = students.filter(s =>
        s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTeachers = teachers.filter(t =>
        t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCourses = courses.filter(c =>
        c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAssignments = assignments.filter(a =>
        a.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-indigo-500/30">
            {/* Animated Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-500/10 blur-[120px] animate-pulse delay-1000" />
            </div>

            <MainLayout>
                <div className="flex-1 space-y-6 pt-2 relative z-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                                Admin Control Panel
                            </h1>
                            <p className="text-lg text-muted-foreground mt-2">
                                Complete platform management and oversight
                            </p>
                        </div>
                        <Button onClick={handleRefresh} variant="outline" className="backdrop-blur-sm bg-white/40 border-white/20 hover:bg-white/60 shadow-sm rounded-full">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Refresh Data
                        </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-up">
                        <Card className="border-none shadow-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Users size={100} />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-blue-100">Total Students</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-extrabold">{students.length}</div>
                                <p className="text-xs text-blue-100 mt-1 font-medium bg-white/10 w-fit px-2 py-0.5 rounded-full">+20% this month</p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <School size={100} />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-purple-100">Total Teachers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-extrabold">{teachers.length}</div>
                                <p className="text-xs text-purple-100 mt-1 font-medium bg-white/10 w-fit px-2 py-0.5 rounded-full">Active Faculty</p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <BookOpen size={100} />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-emerald-100">Active Courses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-extrabold">{courses.length}</div>
                                <p className="text-xs text-emerald-100 mt-1 font-medium bg-white/10 w-fit px-2 py-0.5 rounded-full">Current Semester</p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl bg-gradient-to-br from-orange-500 to-red-600 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FileText size={100} />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-orange-100">Assignments</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-extrabold">{assignments.length}</div>
                                <p className="text-xs text-orange-100 mt-1 font-medium bg-white/10 w-fit px-2 py-0.5 rounded-full">Total Created</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Management Tabs */}
                    <Tabs defaultValue="students" className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <TabsList className="grid w-full md:w-auto grid-cols-2 lg:grid-cols-4 bg-white/40 backdrop-blur-md border border-white/20 p-1.5 rounded-2xl h-auto">
                                <TabsTrigger value="students" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-md transition-all">Students</TabsTrigger>
                                <TabsTrigger value="teachers" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-md transition-all">Teachers</TabsTrigger>
                                <TabsTrigger value="courses" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-md transition-all">Courses</TabsTrigger>
                                <TabsTrigger value="assignments" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-md transition-all">Assignments</TabsTrigger>
                            </TabsList>

                            <div className="relative w-full md:w-72 group">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-600 transition-colors" />
                                <Input
                                    placeholder="Search database..."
                                    className="pl-10 h-11 bg-white/40 border-white/20 hover:bg-white/60 focus:bg-white/80 focus:border-indigo-500/50 backdrop-blur-sm transition-all rounded-full shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Students Tab */}
                        <TabsContent value="students" className="space-y-4">
                            <div className="flex justify-end">
                                <Button onClick={() => setShowStudentModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 rounded-full h-10 px-6">
                                    <UserPlus className="mr-2 h-4 w-4" /> Add Student
                                </Button>
                            </div>
                            <div className="glass-card rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg overflow-hidden">
                                <div className="p-1">
                                    <div className="grid grid-cols-3 font-bold text-xs uppercase tracking-wider text-muted-foreground p-5 bg-white/10 border-b border-white/10">
                                        <div>Student Info</div>
                                        <div>Contact</div>
                                        <div className="text-right">Manage</div>
                                    </div>
                                    <div className="divide-y divide-white/10 max-h-[500px] overflow-y-auto custom-scrollbar">
                                        {filteredStudents.map(student => (
                                            <div key={student._id} className="grid grid-cols-3 items-center p-4 hover:bg-white/30 transition-all duration-200 group">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
                                                        {student.name?.charAt(0) || 'S'}
                                                    </div>
                                                    <div className="font-bold text-foreground">{student.name}</div>
                                                </div>
                                                <div className="text-sm text-foreground/80 font-medium">{student.email}</div>
                                                <div className="text-right flex gap-2 justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/50 hover:text-indigo-600 rounded-full" onClick={() => handleEditStudent(student)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 rounded-full" onClick={() => handleDeleteUser(student._id, 'student')}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        {filteredStudents.length === 0 && (
                                            <div className="text-center py-20 text-muted-foreground">
                                                <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <GraduationCap className="h-8 w-8 opacity-40" />
                                                </div>
                                                <p className="font-medium">No students found matching your search</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Teachers Tab */}
                        <TabsContent value="teachers" className="space-y-4">
                            <div className="flex justify-end">
                                <Button onClick={() => setShowTeacherModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 rounded-full h-10 px-6">
                                    <UserPlus className="mr-2 h-4 w-4" /> Add Teacher
                                </Button>
                            </div>
                            <div className="glass-card rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg overflow-hidden">
                                <div className="p-1">
                                    <div className="grid grid-cols-3 font-bold text-xs uppercase tracking-wider text-muted-foreground p-5 bg-white/10 border-b border-white/10">
                                        <div>Teacher Info</div>
                                        <div>Contact</div>
                                        <div className="text-right">Manage</div>
                                    </div>
                                    <div className="divide-y divide-white/10 max-h-[500px] overflow-y-auto custom-scrollbar">
                                        {filteredTeachers.map(teacher => (
                                            <div key={teacher._id} className="grid grid-cols-3 items-center p-4 hover:bg-white/30 transition-all duration-200 group">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
                                                        {teacher.name?.charAt(0) || 'T'}
                                                    </div>
                                                    <div className="font-bold text-foreground">{teacher.name}</div>
                                                </div>
                                                <div className="text-sm text-foreground/80 font-medium">{teacher.email}</div>
                                                <div className="text-right flex gap-2 justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/50 hover:text-purple-600 rounded-full" onClick={() => handleEditTeacher(teacher)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 rounded-full" onClick={() => handleDeleteUser(teacher._id, 'teacher')}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        {filteredTeachers.length === 0 && (
                                            <div className="text-center py-20 text-muted-foreground">
                                                <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <School className="h-8 w-8 opacity-40" />
                                                </div>
                                                <p className="font-medium">No teachers found</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Courses Tab */}
                        <TabsContent value="courses" className="space-y-4">
                            <div className="flex justify-end">
                                <Button onClick={() => setShowCourseModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 rounded-full h-10 px-6">
                                    <Plus className="mr-2 h-4 w-4" /> Add Course
                                </Button>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {filteredCourses.map(course => (
                                    <Card key={course._id} className="border-white/20 bg-white/40 backdrop-blur-xl hover:bg-white/50 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                                        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-500" />
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{course.title}</CardTitle>
                                                    <CardDescription className="font-medium">{course.subject}</CardDescription>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2 text-muted-foreground hover:text-emerald-600" onClick={() => handleEditCourse(course)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                                                    {course.students?.length || 0} Students
                                                </span>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full" onClick={() => handleDeleteCourse(course._id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                {filteredCourses.length === 0 && (
                                    <div className="col-span-full text-center py-20 text-muted-foreground rounded-2xl border border-white/20 bg-white/20 backdrop-blur-sm">
                                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
                                        <p className="font-medium">No courses found</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Assignments Tab */}
                        <TabsContent value="assignments" className="space-y-4">
                            <div className="flex justify-end">
                                <Button onClick={() => setShowAssignmentModal(true)} className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20 rounded-full h-10 px-6">
                                    <Plus className="mr-2 h-4 w-4" /> Add Assignment
                                </Button>
                            </div>
                            <div className="glass-card rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg overflow-hidden">
                                <div className="p-1">
                                    <div className="grid grid-cols-4 font-bold text-xs uppercase tracking-wider text-muted-foreground p-5 bg-white/10 border-b border-white/10">
                                        <div className="col-span-1">Title</div>
                                        <div className="col-span-1">Course</div>
                                        <div className="col-span-1">Due Date</div>
                                        <div className="col-span-1 text-right">Actions</div>
                                    </div>
                                    <div className="divide-y divide-white/10 max-h-[500px] overflow-y-auto custom-scrollbar">
                                        {filteredAssignments.map(assignment => (
                                            <div key={assignment._id} className="grid grid-cols-4 items-center p-4 hover:bg-white/30 transition-all duration-200 group">
                                                <div className="font-bold text-foreground truncate pr-2">{assignment.title}</div>
                                                <div className="text-sm font-medium text-muted-foreground truncate pr-2">{assignment.course?.title || 'N/A'}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'N/A'}
                                                </div>
                                                <div className="text-right flex gap-2 justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/50 hover:text-orange-600 rounded-full" onClick={() => handleEditAssignment(assignment)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 rounded-full" onClick={() => handleDeleteAssignment(assignment._id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        {filteredAssignments.length === 0 && (
                                            <div className="text-center py-20 text-muted-foreground">
                                                <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <FileText className="h-8 w-8 opacity-40" />
                                                </div>
                                                <p className="font-medium">No assignments found</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Modals */}
                <CreateStudentModal
                    open={showStudentModal}
                    onClose={() => { setShowStudentModal(false); setSelectedStudent(null); }}
                    onCreated={() => { setShowStudentModal(false); setSelectedStudent(null); fetchData(); }}
                    studentToEdit={selectedStudent}
                />

                <CreateTeacherModal
                    open={showTeacherModal}
                    onClose={() => { setShowTeacherModal(false); setSelectedTeacher(null); }}
                    onCreated={() => { setShowTeacherModal(false); setSelectedTeacher(null); fetchData(); }}
                    teacherToEdit={selectedTeacher}
                />

                <CreateCourseModal
                    open={showCourseModal}
                    onClose={() => { setShowCourseModal(false); setSelectedCourse(null); }}
                    onCreated={() => { setShowCourseModal(false); setSelectedCourse(null); fetchData(); }}
                    courseToEdit={selectedCourse}
                />

                <CreateAssignmentModal
                    open={showAssignmentModal}
                    onClose={() => { setShowAssignmentModal(false); setSelectedAssignment(null); }}
                    onCreated={() => { setShowAssignmentModal(false); setSelectedAssignment(null); fetchData(); }}
                    assignmentToEdit={selectedAssignment}
                />
            </MainLayout>
        </div>
    );
};

export default AdminPanel;
