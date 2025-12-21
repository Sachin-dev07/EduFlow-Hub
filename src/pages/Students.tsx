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
} from "lucide-react";
import { cn } from "@/lib/utils";

const students = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma.wilson@school.edu",
    grade: "10th Grade",
    courses: 4,
    avgScore: 92,
    trend: "up",
    change: 5,
    status: "active",
    parentEmail: "parent.wilson@email.com",
  },
  {
    id: 2,
    name: "James Chen",
    email: "james.chen@school.edu",
    grade: "10th Grade",
    courses: 5,
    avgScore: 88,
    trend: "up",
    change: 3,
    status: "active",
    parentEmail: "parent.chen@email.com",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    email: "sophia.martinez@school.edu",
    grade: "11th Grade",
    courses: 4,
    avgScore: 85,
    trend: "down",
    change: 2,
    status: "active",
    parentEmail: "parent.martinez@email.com",
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael.brown@school.edu",
    grade: "10th Grade",
    courses: 4,
    avgScore: 78,
    trend: "up",
    change: 8,
    status: "active",
    parentEmail: "parent.brown@email.com",
  },
  {
    id: 5,
    name: "Olivia Davis",
    email: "olivia.davis@school.edu",
    grade: "11th Grade",
    courses: 5,
    avgScore: 95,
    trend: "up",
    change: 2,
    status: "active",
    parentEmail: "parent.davis@email.com",
  },
  {
    id: 6,
    name: "William Johnson",
    email: "william.johnson@school.edu",
    grade: "10th Grade",
    courses: 4,
    avgScore: 72,
    trend: "down",
    change: 5,
    status: "needs-attention",
    parentEmail: "parent.johnson@email.com",
  },
  {
    id: 7,
    name: "Ava Williams",
    email: "ava.williams@school.edu",
    grade: "11th Grade",
    courses: 4,
    avgScore: 89,
    trend: "up",
    change: 4,
    status: "active",
    parentEmail: "parent.williams@email.com",
  },
  {
    id: 8,
    name: "Ethan Anderson",
    email: "ethan.anderson@school.edu",
    grade: "10th Grade",
    courses: 5,
    avgScore: 81,
    trend: "up",
    change: 6,
    status: "active",
    parentEmail: "parent.anderson@email.com",
  },
];

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-success";
  if (score >= 80) return "text-primary";
  if (score >= 70) return "text-warning";
  return "text-destructive";
};

const Students = () => {
  return (
    <MainLayout>
      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Students
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage student profiles and track progress
            </p>
          </div>
          <Button variant="gradient" size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search students..." className="pl-10" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Mail className="h-4 w-4" />
            Message All
          </Button>
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden animate-slide-up">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Grade
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Courses
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Avg. Score
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Trend
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className="group transition-colors hover:bg-muted/50"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-medium text-primary-foreground">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">
                          {student.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-card-foreground">
                    {student.grade}
                  </td>
                  <td className="px-6 py-4 text-sm text-card-foreground">
                    {student.courses} courses
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-lg font-semibold",
                        getScoreColor(student.avgScore)
                      )}
                    >
                      {student.avgScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium",
                        student.trend === "up"
                          ? "text-success"
                          : "text-destructive"
                      )}
                    >
                      {student.trend === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {student.change}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        student.status === "active"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      )}
                    >
                      {student.status === "active" ? "Active" : "Needs Attention"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Students;
