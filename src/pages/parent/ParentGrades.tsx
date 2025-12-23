import { ParentLayout } from "@/components/layout/ParentLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, TrendingUp, TrendingDown, Minus } from "lucide-react";
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
  if (grade.startsWith("A")) return "bg-green-500/10 text-green-600 border-green-500/20";
  if (grade.startsWith("B")) return "bg-blue-500/10 text-blue-600 border-blue-500/20";
  if (grade.startsWith("C")) return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  return "bg-red-500/10 text-red-600 border-red-500/20";
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600 dark:text-green-400";
  if (score >= 80) return "text-blue-600 dark:text-blue-400";
  if (score >= 70) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
};

const ParentGrades = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-teal-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <ParentLayout>
        {/* Header */}
        <div className="mb-8 animate-fade-in relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">
                Academic Results
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Detailed grade analytics and trends
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="fall2024">
                <SelectTrigger className="w-[150px] rounded-full border-white/20 bg-white/40 backdrop-blur-md">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall2024">Fall 2024</SelectItem>
                  <SelectItem value="spring2024">Spring 2024</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2 rounded-full border-white/20 bg-white/40 backdrop-blur-md hover:bg-white/60">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* GPA Summary */}
        <div className="mb-8 grid gap-4 sm:grid-cols-4 animate-slide-up relative z-10">
          <div className="glass-card rounded-2xl p-6 border border-white/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm font-medium text-muted-foreground">Current GPA</p>
            <p className="mt-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-600 to-green-600">3.8</p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm font-medium text-muted-foreground">Class Rank</p>
            <p className="mt-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600">12<span className="text-lg text-muted-foreground font-normal"> / 180</span></p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm font-medium text-muted-foreground">Credits Earned</p>
            <p className="mt-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600">24</p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm font-medium text-muted-foreground">Honor Roll</p>
            <p className="mt-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-600 to-amber-600">Yes ⭐</p>
          </div>
        </div>

        {/* Course Grades */}
        <div className="space-y-8 relative z-10">
          {courseGrades.map((course, index) => (
            <div
              key={course.course}
              className="glass-card rounded-3xl border border-white/20 overflow-hidden animate-slide-up transition-all hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Course Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/30 dark:bg-zinc-900/30 p-6 backdrop-blur-md">
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold border backdrop-blur-md shadow-inner",
                    getGradeColor(course.currentGrade)
                  )}>
                    {course.currentGrade}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{course.course}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{course.teacher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-3xl font-black text-foreground tracking-tight">{course.percentage}%</p>
                    <div className={cn(
                      "flex items-center justify-end gap-1.5 text-sm font-medium",
                      course.trend === "up" ? "text-green-600" :
                        course.trend === "down" ? "text-red-600" : "text-muted-foreground"
                    )}>
                      {course.trend === "up" && <TrendingUp className="h-4 w-4" />}
                      {course.trend === "down" && <TrendingDown className="h-4 w-4" />}
                      {course.trend === "stable" && <Minus className="h-4 w-4" />}
                      {course.trend === "up" ? "Improving" : course.trend === "down" ? "Declining" : "Stable"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignments Table */}
              <div className="overflow-x-auto bg-white/10 dark:bg-black/10">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-6 py-4 font-semibold">Assignment</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Weight</th>
                      <th className="px-6 py-4 text-right font-semibold">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {course.assignments.map((assignment, i) => (
                      <tr key={i} className="group hover:bg-white/20 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {assignment.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{assignment.date}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
                            {assignment.weight}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={cn("text-sm font-bold", getScoreColor(assignment.grade))}>
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
    </div>
  );
};

export default ParentGrades;
