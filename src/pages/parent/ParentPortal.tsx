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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const childInfo = {
  name: "Emma Wilson",
  grade: "10th Grade",
  school: "Lincoln High School",
  gpa: 3.8,
  attendance: 96,
};

const upcomingAssignments = [
  {
    id: 1,
    title: "Algebra Homework Ch. 7",
    course: "Mathematics",
    dueDate: "Dec 10, 2024",
    status: "pending",
  },
  {
    id: 2,
    title: "Lab Report: Photosynthesis",
    course: "Biology",
    dueDate: "Dec 12, 2024",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Essay: World War II",
    course: "History",
    dueDate: "Dec 14, 2024",
    status: "pending",
  },
];

const recentGrades = [
  { course: "Mathematics", assignment: "Quiz - Chapter 6", grade: 95, date: "Dec 5" },
  { course: "Biology", assignment: "Lab Report", grade: 88, date: "Dec 4" },
  { course: "English", assignment: "Essay Draft", grade: 92, date: "Dec 3" },
  { course: "History", assignment: "Chapter Test", grade: 85, date: "Dec 2" },
];

const courses = [
  { name: "Mathematics", teacher: "Ms. Johnson", grade: "A", progress: 92 },
  { name: "Biology", teacher: "Mr. Smith", grade: "B+", progress: 87 },
  { name: "English", teacher: "Mrs. Davis", grade: "A-", progress: 90 },
  { name: "History", teacher: "Mr. Brown", grade: "B", progress: 82 },
];

const ParentPortal = () => {
  return (
    <ParentLayout>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome, John! 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here's how {childInfo.name} is doing this semester.
            </p>
          </div>
          <Link to="/parent/messages">
            <Button variant="accent" size="lg" className="gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Teachers
            </Button>
          </Link>
        </div>
      </div>

      {/* Child Overview Card */}
      <div className="mb-8 animate-slide-up">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary text-2xl font-bold text-primary-foreground">
              EW
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground">{childInfo.name}</h2>
              <p className="text-muted-foreground">{childInfo.grade} • {childInfo.school}</p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{childInfo.gpa}</p>
                <p className="text-sm text-muted-foreground">GPA</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">{childInfo.attendance}%</p>
                <p className="text-sm text-muted-foreground">Attendance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Current GPA", value: "3.8", icon: GraduationCap, color: "text-primary bg-primary/10" },
          { label: "Assignments Due", value: "3", icon: FileText, color: "text-accent bg-accent/10" },
          { label: "Courses", value: "4", icon: BookOpen, color: "text-success bg-success/10" },
          { label: "Unread Messages", value: "2", icon: MessageSquare, color: "text-warning bg-warning/10" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5 shadow-card animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-card-foreground">{stat.value}</p>
              </div>
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course Performance */}
        <div className="rounded-xl border border-border bg-card shadow-card animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between border-b border-border p-5">
            <h3 className="text-lg font-semibold text-card-foreground">Course Performance</h3>
            <Link to="/parent/grades">
              <Button variant="ghost" size="sm" className="text-primary">View all</Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {courses.map((course) => (
              <div key={course.name} className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-card-foreground">{course.name}</p>
                  <p className="text-sm text-muted-foreground">{course.teacher}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <span className={cn(
                    "inline-flex h-8 w-10 items-center justify-center rounded-lg text-sm font-bold",
                    course.grade.startsWith("A") ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                  )}>
                    {course.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="rounded-xl border border-border bg-card shadow-card animate-slide-up" style={{ animationDelay: "250ms" }}>
          <div className="flex items-center justify-between border-b border-border p-5">
            <h3 className="text-lg font-semibold text-card-foreground">Upcoming Assignments</h3>
            <Link to="/parent/assignments">
              <Button variant="ghost" size="sm" className="text-primary">View all</Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-start gap-4 p-4">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  assignment.status === "in-progress" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
                )}>
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-card-foreground">{assignment.title}</p>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {assignment.dueDate}
                  </div>
                  <span className={cn(
                    "mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                    assignment.status === "in-progress" 
                      ? "bg-warning/10 text-warning" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {assignment.status === "in-progress" ? "In Progress" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Grades */}
        <div className="rounded-xl border border-border bg-card shadow-card animate-slide-up lg:col-span-2" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-between border-b border-border p-5">
            <h3 className="text-lg font-semibold text-card-foreground">Recent Grades</h3>
            <Link to="/parent/grades">
              <Button variant="ghost" size="sm" className="text-primary">View all grades</Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Course</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Assignment</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentGrades.map((item, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium text-card-foreground">{item.course}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.assignment}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "inline-flex h-8 w-12 items-center justify-center rounded-lg text-sm font-bold",
                        item.grade >= 90 ? "bg-success/10 text-success" :
                        item.grade >= 80 ? "bg-primary/10 text-primary" :
                        "bg-warning/10 text-warning"
                      )}>
                        {item.grade}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default ParentPortal;
