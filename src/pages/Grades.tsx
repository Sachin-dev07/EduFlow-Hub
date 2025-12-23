import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStudents } from "@/api/userApi";
import { getAssignments } from "@/api/assignmentApi";
import { useToast } from "@/hooks/use-toast";

const getGradeColor = (score: number) => {
  if (score >= 90) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
  if (score >= 80) return "bg-blue-500/10 text-blue-600 border-blue-500/20";
  if (score >= 70) return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  return "bg-red-500/10 text-red-600 border-red-500/20";
};

const getScoreBg = (score: number | null) => {
  if (score === null || score === undefined) return "bg-slate-100 text-slate-400";
  if (score >= 90) return "bg-emerald-50 text-emerald-700";
  if (score >= 80) return "bg-blue-50 text-blue-700";
  if (score >= 70) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
};

const Grades = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsData, assignmentsData] = await Promise.all([
        getStudents(),
        getAssignments()
      ]);
      setStudents(studentsData);
      setAssignments(assignmentsData);
    } catch (error) {
      console.error("Failed to fetch grade data:", error);
      toast({
        title: "Error",
        description: "Failed to load grade data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter assignments by selected subject/course
  // Note: Backend assignments have 'subject' but not explicit 'courseId' in this simple schema
  // We will filter by 'subject' if selected, or show all.
  const filteredAssignments = selectedCourse === "all"
    ? assignments
    : assignments.filter(a => a.subject.toLowerCase() === selectedCourse || a.title.toLowerCase().includes(selectedCourse));

  // Determine unique subjects for filter
  const subjects = Array.from(new Set(assignments.map(a => a.subject)));

  const calculateStudentGrade = (studentId: string) => {
    // Only consider filtered assignments for the grade calculation? 
    // Usually grade is course-specific. 
    // If "all" is selected, we calculate overall average across all assignments (GPA-like)

    const relevantAssignments = filteredAssignments;
    if (relevantAssignments.length === 0) return { average: 0, letter: "N/A" };

    let total = 0;
    let count = 0;

    relevantAssignments.forEach(assignment => {
      const sub = assignment.submissions?.find((s: any) => s.student?._id === studentId || s.student === studentId);
      if (sub && typeof sub.grade === 'number') {
        total += sub.grade;
        count++;
      }
    });

    if (count === 0) return { average: 0, letter: "N/A" };

    const average = total / count;
    let letter = "F";
    if (average >= 90) letter = "A";
    else if (average >= 80) letter = "B";
    else if (average >= 70) letter = "C";
    else if (average >= 60) letter = "D";

    return { average, letter, count };
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-teal-500/30">

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <MainLayout>
        {/* Page Header */}
        <div className="mb-8 animate-fade-in space-y-2 relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                Gradebook
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Track student performance and view grades
              </p>
            </div>
            <Button variant="outline" size="lg" className="h-12 px-6 gap-2 backdrop-blur-md bg-white/40 border-white/20 hover:bg-white/60 rounded-full">
              <Download className="h-5 w-5" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4 animate-slide-up relative z-10">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[220px] h-12 bg-white/40 backdrop-blur-md border-white/20 shadow-sm focus:bg-white/60 transition-all rounded-full">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto text-sm text-muted-foreground font-medium bg-white/30 px-3 py-1 rounded-full border border-white/10">
            Showing {filteredAssignments.length} Assignments
          </div>
        </div>

        {/* Grade Table */}
        <div className="glass-card rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-xl overflow-hidden animate-slide-up dark:bg-black/40 relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/10">
                  <th className="sticky left-0 bg-white/40 backdrop-blur-md z-20 px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground border-r border-white/10 min-w-[200px]">
                    Student
                  </th>
                  {filteredAssignments.map((assignment, idx) => (
                    <th key={assignment._id} className="px-4 py-5 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground min-w-[100px]">
                      <div className="truncate w-full" title={assignment.title}>
                        {assignment.title.length > 15 ? assignment.title.substring(0, 12) + "..." : assignment.title}
                      </div>
                      <div className="text-[10px] opacity-60 font-normal mt-0.5">{assignment.subject}</div>
                    </th>
                  ))}

                  <th className="px-4 py-5 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground min-w-[80px]">
                    Avg
                  </th>
                  <th className="px-4 py-5 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground min-w-[80px]">
                    Letter
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr><td colSpan={filteredAssignments.length + 3} className="p-20 text-center text-muted-foreground">
                    <div className="flex justify-center mb-4">
                      <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                    </div>
                    Loading student grades...
                  </td></tr>
                ) : students.length === 0 ? (
                  <tr><td colSpan={filteredAssignments.length + 3} className="p-20 text-center text-muted-foreground">No students found.</td></tr>
                ) : (
                  students.map((student, index) => {
                    const { average, letter } = calculateStudentGrade(student._id);
                    return (
                      <tr
                        key={student._id}
                        className="group transition-colors hover:bg-white/30 dark:hover:bg-white/5"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <td className="sticky left-0 bg-white/40 backdrop-blur-md group-hover:bg-white/60 transition-colors z-10 px-6 py-4 border-r border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-xs font-bold text-white shadow-sm ring-1 ring-white/20">
                              {student.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .substring(0, 2)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-foreground whitespace-nowrap">
                                {student.name}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                {student.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Assignment Grades */}
                        {filteredAssignments.map(assignment => {
                          const submission = assignment.submissions?.find((s: any) => s.student?._id === student._id || s.student === student._id);
                          return (
                            <td key={assignment._id} className="px-4 py-4 text-center">
                              <span
                                className={cn(
                                  "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold shadow-sm transition-transform hover:scale-110 cursor-default",
                                  getScoreBg(submission?.grade),
                                )}
                                title={submission ? `Status: ${submission.status}` : "Not submitted"}
                              >
                                {submission?.grade !== undefined && submission?.grade !== null ? submission.grade : "-"}
                              </span>
                            </td>
                          );
                        })}

                        {/* Totals */}
                        <td className="px-4 py-4 text-center">
                          <span className="text-lg font-bold text-foreground">
                            {average > 0 ? average.toFixed(1) : "-"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span
                            className={cn(
                              "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black shadow-sm border",
                              average > 0 ? getGradeColor(average) : "bg-slate-100 text-slate-400"
                            )}
                          >
                            {letter}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Grades;
