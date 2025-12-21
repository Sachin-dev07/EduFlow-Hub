import { MainLayout } from "@/components/layout/MainLayout";
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

const gradeData = [
  {
    student: "Emma Wilson",
    assignments: [95, 88, 92, 90, 94],
    quizzes: [98, 92],
    midterm: 94,
    participation: 95,
    final: null,
    average: 93.5,
    letterGrade: "A",
    trend: "up",
  },
  {
    student: "James Chen",
    assignments: [88, 92, 85, 90, 88],
    quizzes: [90, 85],
    midterm: 88,
    participation: 92,
    final: null,
    average: 88.7,
    letterGrade: "B+",
    trend: "up",
  },
  {
    student: "Sophia Martinez",
    assignments: [85, 82, 88, 80, 86],
    quizzes: [82, 88],
    midterm: 84,
    participation: 88,
    final: null,
    average: 84.8,
    letterGrade: "B",
    trend: "down",
  },
  {
    student: "Michael Brown",
    assignments: [78, 75, 82, 80, 78],
    quizzes: [76, 80],
    midterm: 78,
    participation: 85,
    final: null,
    average: 78.9,
    letterGrade: "C+",
    trend: "up",
  },
  {
    student: "Olivia Davis",
    assignments: [98, 95, 96, 94, 97],
    quizzes: [95, 98],
    midterm: 96,
    participation: 98,
    final: null,
    average: 96.3,
    letterGrade: "A",
    trend: "up",
  },
];

const getGradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "bg-success/10 text-success";
  if (grade.startsWith("B")) return "bg-primary/10 text-primary";
  if (grade.startsWith("C")) return "bg-warning/10 text-warning";
  return "bg-destructive/10 text-destructive";
};

const getScoreBg = (score: number | null) => {
  if (score === null) return "bg-muted text-muted-foreground";
  if (score >= 90) return "bg-success/10 text-success";
  if (score >= 80) return "bg-primary/10 text-primary";
  if (score >= 70) return "bg-warning/10 text-warning";
  return "bg-destructive/10 text-destructive";
};

const Grades = () => {
  return (
    <MainLayout>
      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Grade Management
            </h1>
            <p className="mt-1 text-muted-foreground">
              View and manage student grades across all courses
            </p>
          </div>
          <Button variant="outline" size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Export Grades
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4 animate-slide-up">
        <Select defaultValue="algebra">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="algebra">Introduction to Algebra</SelectItem>
            <SelectItem value="history">World History</SelectItem>
            <SelectItem value="biology">Biology Fundamentals</SelectItem>
            <SelectItem value="english">English Literature</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="fall2024">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fall2024">Fall 2024</SelectItem>
            <SelectItem value="spring2024">Spring 2024</SelectItem>
            <SelectItem value="fall2023">Fall 2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grade Table */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden animate-slide-up">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="sticky left-0 bg-muted/50 px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Student
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  HW 1
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  HW 2
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  HW 3
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  HW 4
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  HW 5
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  Quiz 1
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  Quiz 2
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  Midterm
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  Participation
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  Final
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  Average
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  Grade
                </th>
                <th className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {gradeData.map((row, index) => (
                <tr
                  key={row.student}
                  className="group transition-colors hover:bg-muted/50"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="sticky left-0 bg-card group-hover:bg-muted/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-xs font-medium text-primary-foreground">
                        {row.student
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-medium text-card-foreground whitespace-nowrap">
                        {row.student}
                      </span>
                    </div>
                  </td>
                  {row.assignments.map((score, i) => (
                    <td key={i} className="px-4 py-4 text-center">
                      <span
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
                          getScoreBg(score)
                        )}
                      >
                        {score}
                      </span>
                    </td>
                  ))}
                  {row.quizzes.map((score, i) => (
                    <td key={i} className="px-4 py-4 text-center">
                      <span
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
                          getScoreBg(score)
                        )}
                      >
                        {score}
                      </span>
                    </td>
                  ))}
                  <td className="px-4 py-4 text-center">
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
                        getScoreBg(row.midterm)
                      )}
                    >
                      {row.midterm}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
                        getScoreBg(row.participation)
                      )}
                    >
                      {row.participation}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
                        getScoreBg(row.final)
                      )}
                    >
                      {row.final ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-lg font-bold text-card-foreground">
                      {row.average.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={cn(
                        "inline-flex h-8 w-10 items-center justify-center rounded-lg text-sm font-bold",
                        getGradeColor(row.letterGrade)
                      )}
                    >
                      {row.letterGrade}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {row.trend === "up" ? (
                      <TrendingUp className="mx-auto h-5 w-5 text-success" />
                    ) : (
                      <TrendingDown className="mx-auto h-5 w-5 text-destructive" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Distribution Summary */}
      <div className="mt-8 grid gap-6 sm:grid-cols-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
        {[
          { grade: "A", count: 2, percent: 40, color: "bg-success" },
          { grade: "B", count: 2, percent: 40, color: "bg-primary" },
          { grade: "C", count: 1, percent: 20, color: "bg-warning" },
          { grade: "D/F", count: 0, percent: 0, color: "bg-destructive" },
        ].map((item) => (
          <div
            key={item.grade}
            className="rounded-xl border border-border bg-card p-5 shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-card-foreground">
                {item.grade}
              </span>
              <span className="text-sm text-muted-foreground">
                {item.count} students
              </span>
            </div>
            <div className="mt-3">
              <div className="h-2 rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full", item.color)}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.percent}% of class
              </p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Grades;
