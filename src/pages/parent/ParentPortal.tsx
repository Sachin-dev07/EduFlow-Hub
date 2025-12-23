import { useState, useEffect } from "react";
import { ParentLayout } from "@/components/layout/ParentLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  FileText,
  MessageSquare,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { getStudents } from "@/api/userApi";
import { getCourses } from "@/api/courseApi";
import { getAssignments } from "@/api/assignmentApi";

const ParentPortal = () => {
  const [child, setChild] = useState<any>({ name: "Loading...", grade: "...", school: "...", gpa: 0, attendance: 0 });
  const [courses, setCourses] = useState<any[]>([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState<any[]>([]);
  const [recentGrades, setRecentGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, coursesData, assignmentsData] = await Promise.all([
          getStudents(),
          getCourses(),
          getAssignments()
        ]);

        const myChild = studentsData[0] || { name: "My Child", grade: "Student" };
        setChild({
          ...myChild,
          school: "Lincoln High School", // Mock
          gpa: 3.8, // Mock
          attendance: 96 // Mock
        });

        setCourses(coursesData.slice(0, 4).map((c: any) => ({
          name: c.title,
          teacher: "Teacher",
          grade: ["A", "B+", "A-", "B"][Math.floor(Math.random() * 4)],
          progress: Math.floor(Math.random() * 30) + 70
        })));

        const upcoming = assignmentsData
          .filter((a: any) => new Date(a.dueDate) > new Date())
          .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
          .slice(0, 3)
          .map((a: any) => ({
            id: a._id,
            title: a.title,
            course: a.course?.title || a.subject || "General",
            dueDate: new Date(a.dueDate).toLocaleDateString(),
            status: "pending"
          }));
        setUpcomingAssignments(upcoming);

        const grades = assignmentsData
          .slice(0, 5)
          .map((a: any) => ({
            course: a.course?.title || a.subject || "General",
            assignment: a.title,
            grade: Math.floor(Math.random() * (100 - 80) + 80),
            date: new Date(a.createdAt || Date.now()).toLocaleDateString()
          }));
        setRecentGrades(grades);

      } catch (error) {
        console.error("Failed to load parent portal data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <ParentLayout>
        <div className="flex h-screen items-center justify-center p-10">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
            <p className="text-muted-foreground animate-pulse">Loading parent dashboard...</p>
          </div>
        </div>
      </ParentLayout>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-amber-500/30">

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <ParentLayout>
        {/* Header */}
        <div className="mb-8 animate-fade-in space-y-2 relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
                Welcome, Parent!
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Monitoring progress for <span className="font-bold text-foreground">{child.name}</span>
              </p>
            </div>
            <Link to="/parent/messages">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg hover:shadow-amber-500/25 transition-all duration-300 gap-2 h-12 px-6 rounded-full text-white border-0 hover:scale-105 active:scale-95">
                <MessageSquare className="h-5 w-5" />
                Contact Teachers
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Stats Card */}
        <div className="mb-8 animate-slide-up relative z-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-xl p-8 dark:bg-black/40 group hover:bg-white/50 transition-colors duration-500">
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl group-hover:bg-orange-500/20 transition-all duration-700" />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg text-3xl font-bold text-white ring-4 ring-white/30">
                {child.name.charAt(0)}
              </div>

              <div className="flex-1 space-y-2">
                <h2 className="text-3xl font-bold text-foreground">{child.name}</h2>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1.5 bg-white/50 dark:bg-black/20 px-2 py-1 rounded-md text-sm border border-white/10">
                    <GraduationCap className="h-4 w-4 text-amber-600" />
                    {child.grade || "Student"}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                  <span className="flex items-center gap-1.5 bg-white/50 dark:bg-black/20 px-2 py-1 rounded-md text-sm border border-white/10">
                    <BookOpen className="h-4 w-4 text-orange-600" />
                    {child.school}
                  </span>
                </div>
              </div>

              <div className="flex gap-12 border-l border-white/20 px-8 dark:border-white/10">
                <div className="text-center">
                  <div className="flex items-end justify-center gap-1">
                    <p className="text-4xl font-extrabold text-foreground">{child.gpa}</p>
                    <span className="mb-1.5 text-sm font-medium text-muted-foreground">/4.0</span>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide opacity-70">GPA</p>
                </div>
                <div className="text-center">
                  <div className="flex items-end justify-center gap-1">
                    <p className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{child.attendance}%</p>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide opacity-70">Attendance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
          {[
            { label: "Assignments Due", value: upcomingAssignments.length, icon: FileText, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20" },
            { label: "Active Courses", value: courses.length, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/20" },
            { label: "Recent Grades", value: recentGrades.length, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/20" },
            { label: "Unread Messages", value: "2", icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/20" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/40 backdrop-blur-lg p-6 hover:bg-white/60 transition-all duration-300 dark:bg-black/40 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
                </div>
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 relative z-10">
          {/* Performance Section */}
          <div className="rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg dark:bg-black/40 animate-slide-up hover:bg-white/50 transition-colors" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h3 className="text-xl font-bold text-foreground">Course Performance</h3>
              <Link to="/parent/grades">
                <Button variant="ghost" size="sm" className="hover:bg-amber-500/10 hover:text-amber-600 group">
                  Full Report <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="p-4 space-y-2">
              {courses.length > 0 ? courses.map((course) => (
                <div key={course.name} className="flex items-center gap-4 p-4 hover:bg-white/40 rounded-2xl transition-all duration-300 dark:hover:bg-white/10 border border-transparent hover:border-white/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 font-bold">
                    {course.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground">{course.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{course.teacher}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={cn(
                      "inline-flex h-7 px-3 items-center justify-center rounded-full text-xs font-bold ring-1 ring-inset",
                      course.grade.startsWith("A") ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20" : "bg-blue-500/10 text-blue-600 ring-blue-500/20"
                    )}>
                      {course.grade}
                    </span>
                    <div className="w-24 h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              )) : <div className="p-8 text-center text-muted-foreground">No courses enrolled</div>}
            </div>
          </div>

          {/* Assignments Section */}
          <div className="rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg dark:bg-black/40 animate-slide-up hover:bg-white/50 transition-colors" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-foreground">Upcoming Tasks</h3>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm">
                  {upcomingAssignments.length}
                </span>
              </div>
              <Link to="/parent/assignments">
                <Button variant="ghost" size="sm" className="hover:bg-amber-500/10 hover:text-amber-600 group">
                  View Calendar <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="p-4 space-y-2">
              {upcomingAssignments.length > 0 ? upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="group flex items-start gap-4 p-4 hover:bg-white/40 rounded-2xl transition-all duration-300 dark:hover:bg-white/10 border border-transparent hover:border-white/20">
                  <div className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-colors",
                    assignment.status === "in-progress"
                      ? "bg-amber-100 border-amber-200 text-amber-600"
                      : "bg-blue-100 border-blue-200 text-blue-600"
                  )}>
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground group-hover:text-amber-600 transition-colors">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{assignment.course}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1.5 rounded-lg">
                      <Calendar className="h-3.5 w-3.5" />
                      {assignment.dueDate}
                    </div>
                  </div>
                </div>
              )) : <div className="p-8 text-center text-muted-foreground">No pending assignments! 🎉</div>}
            </div>
          </div>

          {/* Recent Grades Table (Full Width) */}
          <div className="lg:col-span-2 rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg dark:bg-black/40 animate-slide-up space-y-4 p-6 hover:bg-white/50 transition-colors" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-sm">
              <table className="w-full">
                <thead className="bg-white/50 dark:bg-white/5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 text-left">Course</th>
                    <th className="px-6 py-4 text-left">Assignment</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-white/30 dark:bg-transparent">
                  {recentGrades.length > 0 ? recentGrades.map((item, index) => (
                    <tr key={index} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-foreground">{item.course}</td>
                      <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{item.assignment}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.date}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm",
                          item.grade >= 90 ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
                            item.grade >= 80 ? "bg-blue-100 text-blue-800 border border-blue-200" :
                              "bg-amber-100 text-amber-800 border border-amber-200"
                        )}>
                          {item.grade}%
                        </span>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No recent activity</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ParentLayout>
    </div>
  );
};

export default ParentPortal;
