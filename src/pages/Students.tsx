import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  Mail,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Loader2,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStudents } from "@/api/userApi";
import { getAssignments } from "@/api/assignmentApi";
import { useToast } from "@/hooks/use-toast";

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 80) return "text-blue-600 dark:text-blue-400";
  if (score >= 70) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
};

const Students = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const [studentsData, assignmentsData] = await Promise.all([
        getStudents(),
        getAssignments()
      ]);

      const enhancedData = studentsData.map((student: any) => {
        // Calculate average score from real assignments
        let totalScore = 0;
        let gradedCount = 0;
        let recentScore = 0;
        let previousScore = 0;

        // Sort assignments by date to determine trend
        const sortedAssignments = assignmentsData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        sortedAssignments.forEach((assignment: any) => {
          const sub = assignment.submissions?.find((s: any) => s.student?._id === student._id || s.student === student._id);
          if (sub && typeof sub.grade === 'number') {
            totalScore += sub.grade;
            gradedCount++;
            if (gradedCount === 1) recentScore = sub.grade;
            if (gradedCount === 2) previousScore = sub.grade;
          }
        });

        const avgScore = gradedCount > 0 ? Math.round(totalScore / gradedCount) : 0;

        // Determine trend based on last two graded assignments
        // If only 1 grade, neutral. 
        let trend = "neutral";
        let change = 0;

        if (gradedCount >= 2) {
          change = recentScore - previousScore;
          trend = change >= 0 ? "up" : "down";
        }

        return {
          ...student,
          id: student._id,
          courses: "Enrolled", // We don't have course enrollment count easily available yet, using placeholder or logic can extend later
          avgScore: avgScore,
          trend: trend,
          change: Math.abs(change),
          status: "active", // Default status
          grade: student.grade || "Student"
        };
      });

      setStudents(enhancedData);
    } catch (error) {
      console.error("Failed to fetch students data:", error);
      toast({
        title: "Error",
        description: "Failed to load students list",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredStudents = students.filter((s: any) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-cyan-500/30">

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <MainLayout>
        {/* Page Header */}
        <div className="mb-8 animate-fade-in space-y-2 relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
                Students
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Manage student directory and performance
              </p>
            </div>
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 gap-2 h-12 px-6 rounded-full text-white border-0 hover:scale-105 active:scale-95">
              <Plus className="h-5 w-5" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up relative z-10">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-cyan-500 transition-colors" />
            <Input
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 bg-white/40 backdrop-blur-md border-white/20 shadow-sm focus:bg-white/60 focus:border-cyan-500/50 transition-all rounded-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-12 px-5 gap-2 bg-white/40 backdrop-blur-md border-white/20 hover:bg-white/60 rounded-full">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="h-12 px-5 gap-2 bg-white/40 backdrop-blur-md border-white/20 hover:bg-white/60 rounded-full">
              <Mail className="h-4 w-4" />
              Message All
            </Button>
          </div>
        </div>

        {/* Students Table */}
        <div className="rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-xl overflow-hidden animate-slide-up dark:bg-black/40 relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/10">
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Student
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Grade Level
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Avg. Score
                  </th>
                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Trend
                  </th>
                  <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-muted-foreground">
                      <div className="flex justify-center mb-4">
                        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                      </div>
                      Loading students directory...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <div className="h-16 w-16 mb-4 rounded-full bg-white/20 flex items-center justify-center">
                          <Users className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        <p className="text-lg font-medium">No students found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student: any, index: number) => (
                    <tr
                      key={student.id}
                      className="group transition-colors hover:bg-white/30 dark:hover:bg-white/5"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white shadow-lg ring-2 ring-white/20">
                            {student.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .substring(0, 2)}
                          </div>
                          <div>
                            <p className="font-bold text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              {student.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        <span className="inline-flex items-center rounded-md bg-white/20 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-white/10">
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide border",
                            student.status === "active"
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          )}
                        >
                          {student.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "text-lg font-bold",
                            student.avgScore > 0 ? getScoreColor(student.avgScore) : "text-muted-foreground"
                          )}
                        >
                          {student.avgScore > 0 ? `${student.avgScore}%` : "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {student.trend !== "neutral" && student.avgScore > 0 ? (
                          <div
                            className={cn(
                              "flex items-center gap-1.5 text-sm font-semibold",
                              student.trend === "up"
                                ? "text-emerald-500"
                                : "text-red-500"
                            )}
                          >
                            {student.trend === "up" ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            {student.change}%
                          </div>
                        ) : <span className="text-xs text-muted-foreground">No recent trend</span>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:bg-white/40 hover:text-cyan-600 rounded-full transition-colors"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:bg-white/40 hover:text-cyan-600 rounded-full transition-colors"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )))}
              </tbody>
            </table>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Students;
