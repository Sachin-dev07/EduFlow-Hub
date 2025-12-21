import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const students = [
  {
    id: 1,
    name: "Emma Wilson",
    avatar: null,
    grade: "A",
    progress: 92,
    trend: "up",
    change: 5,
  },
  {
    id: 2,
    name: "James Chen",
    avatar: null,
    grade: "A-",
    progress: 88,
    trend: "up",
    change: 3,
  },
  {
    id: 3,
    name: "Sophia Martinez",
    avatar: null,
    grade: "B+",
    progress: 85,
    trend: "down",
    change: 2,
  },
  {
    id: 4,
    name: "Michael Brown",
    avatar: null,
    grade: "B",
    progress: 78,
    trend: "up",
    change: 8,
  },
  {
    id: 5,
    name: "Olivia Davis",
    avatar: null,
    grade: "B-",
    progress: 75,
    trend: "up",
    change: 4,
  },
];

const gradeColors: Record<string, string> = {
  "A": "bg-success/10 text-success",
  "A-": "bg-success/10 text-success",
  "B+": "bg-primary/10 text-primary",
  "B": "bg-primary/10 text-primary",
  "B-": "bg-accent/10 text-accent",
  "C+": "bg-warning/10 text-warning",
  "C": "bg-warning/10 text-warning",
};

export function StudentProgress() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <div className="border-b border-border p-5">
        <h3 className="text-lg font-semibold text-card-foreground">
          Top Performing Students
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Based on overall grade performance
        </p>
      </div>
      <div className="divide-y divide-border">
        {students.map((student, index) => (
          <div
            key={student.id}
            className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-medium text-primary-foreground">
              {student.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">
                {student.name}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {student.progress}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold",
                  gradeColors[student.grade] || "bg-muted text-muted-foreground"
                )}
              >
                {student.grade}
              </span>
              <div
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  student.trend === "up" ? "text-success" : "text-destructive"
                )}
              >
                {student.trend === "up" ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {student.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
