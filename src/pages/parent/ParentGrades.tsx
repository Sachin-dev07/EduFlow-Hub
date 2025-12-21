import { ParentLayout } from "@/components/layout/ParentLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const courseGrades = [
  {
    course: "Mathematics",
    teacher: "Ms. Sarah Johnson",
    currentGrade: "A",
    percentage: 92,
    trend: "up",
    assignments: [
      { name: "Homework Ch. 5", grade: 95, weight: "10%", date: "Nov 28" },
      { name: "Quiz - Chapter 5", grade: 88, weight: "15%", date: "Dec 1" },
      { name: "Homework Ch. 6", grade: 92, weight: "10%", date: "Dec 3" },
      { name: "Quiz - Chapter 6", grade: 95, weight: "15%", date: "Dec 5" },
      { name: "Midterm Exam", grade: 90, weight: "25%", date: "Dec 8" },
    ],
  },
  {
    course: "Biology",
    teacher: "Mr. David Smith",
    currentGrade: "B+",
    percentage: 87,
    trend: "up",
    assignments: [
      { name: "Lab Report 1", grade: 85, weight: "15%", date: "Nov 25" },
      { name: "Chapter Quiz", grade: 82, weight: "10%", date: "Nov 30" },
      { name: "Lab Report 2", grade: 88, weight: "15%", date: "Dec 4" },
      { name: "Midterm", grade: 90, weight: "30%", date: "Dec 7" },
    ],
  },
  {
    course: "English Literature",
    teacher: "Mrs. Emily Davis",
    currentGrade: "A-",
    percentage: 90,
    trend: "stable",
    assignments: [
      { name: "Essay Draft", grade: 88, weight: "15%", date: "Nov 26" },
      { name: "Reading Quiz", grade: 92, weight: "10%", date: "Dec 2" },
      { name: "Essay Final", grade: 92, weight: "25%", date: "Dec 5" },
      { name: "Participation", grade: 90, weight: "10%", date: "Dec 8" },
    ],
  },
  {
    course: "World History",
    teacher: "Mr. Robert Brown",
    currentGrade: "B",
    percentage: 82,
    trend: "down",
    assignments: [
      { name: "Chapter 10 Quiz", grade: 78, weight: "10%", date: "Nov 27" },
      { name: "Essay", grade: 85, weight: "20%", date: "Dec 1" },
      { name: "Chapter 11 Quiz", grade: 80, weight: "10%", date: "Dec 4" },
      { name: "Midterm", grade: 82, weight: "30%", date: "Dec 6" },
    ],
  },
];

const getGradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "bg-success/10 text-success";
  if (grade.startsWith("B")) return "bg-primary/10 text-primary";
  if (grade.startsWith("C")) return "bg-warning/10 text-warning";
  return "bg-destructive/10 text-destructive";
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-success";
  if (score >= 80) return "text-primary";
  if (score >= 70) return "text-warning";
  return "text-destructive";
};

const ParentGrades = () => {
  return (
    <ParentLayout>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Emma's Grades
            </h1>
            <p className="mt-1 text-muted-foreground">
              View detailed grade information for all courses
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="fall2024">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fall2024">Fall 2024</SelectItem>
                <SelectItem value="spring2024">Spring 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* GPA Summary */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4 animate-slide-up">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Current GPA</p>
          <p className="mt-1 text-3xl font-bold text-primary">3.8</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Class Rank</p>
          <p className="mt-1 text-3xl font-bold text-accent">12 / 180</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Credits Earned</p>
          <p className="mt-1 text-3xl font-bold text-success">24</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Honor Roll</p>
          <p className="mt-1 text-3xl font-bold text-warning">Yes ⭐</p>
        </div>
      </div>

      {/* Course Grades */}
      <div className="space-y-6">
        {courseGrades.map((course, index) => (
          <div
            key={course.course}
            className="rounded-xl border border-border bg-card shadow-card overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Course Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/30 p-5">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex h-12 w-14 items-center justify-center rounded-xl text-lg font-bold",
                  getGradeColor(course.currentGrade)
                )}>
                  {course.currentGrade}
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{course.course}</h3>
                  <p className="text-sm text-muted-foreground">{course.teacher}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-card-foreground">{course.percentage}%</p>
                  <div className={cn(
                    "flex items-center justify-end gap-1 text-sm",
                    course.trend === "up" ? "text-success" :
                    course.trend === "down" ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {course.trend === "up" && <TrendingUp className="h-4 w-4" />}
                    {course.trend === "down" && <TrendingDown className="h-4 w-4" />}
                    {course.trend === "up" ? "Improving" : course.trend === "down" ? "Declining" : "Stable"}
                  </div>
                </div>
              </div>
            </div>

            {/* Assignments Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Assignment</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Weight</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {course.assignments.map((assignment, i) => (
                    <tr key={i} className="hover:bg-muted/50">
                      <td className="px-6 py-3 text-sm text-card-foreground">{assignment.name}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">{assignment.date}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">{assignment.weight}</td>
                      <td className="px-6 py-3 text-right">
                        <span className={cn("font-semibold", getScoreColor(assignment.grade))}>
                          {assignment.grade}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </ParentLayout>
  );
};

export default ParentGrades;
