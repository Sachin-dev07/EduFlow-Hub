import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const assignments = [
  {
    id: 1,
    title: "Algebra Homework Ch. 7",
    course: "Mathematics",
    dueDate: "Dec 10, 2024",
    dueTime: "11:59 PM",
    submissions: 18,
    total: 32,
    status: "active",
  },
  {
    id: 2,
    title: "Lab Report: Photosynthesis",
    course: "Biology",
    dueDate: "Dec 12, 2024",
    dueTime: "3:00 PM",
    submissions: 12,
    total: 28,
    status: "active",
  },
  {
    id: 3,
    title: "Essay: World War II",
    course: "History",
    dueDate: "Dec 14, 2024",
    dueTime: "5:00 PM",
    submissions: 5,
    total: 30,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Python Coding Challenge",
    course: "Computer Science",
    dueDate: "Dec 15, 2024",
    dueTime: "11:59 PM",
    submissions: 0,
    total: 25,
    status: "upcoming",
  },
];

export function UpcomingAssignments() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-border p-5">
        <h3 className="text-lg font-semibold text-card-foreground">
          Upcoming Assignments
        </h3>
        <Button variant="ghost" size="sm" className="text-primary">
          View all
        </Button>
      </div>
      <div className="divide-y divide-border">
        {assignments.map((assignment, index) => (
          <div
            key={assignment.id}
            className="group p-4 transition-colors hover:bg-muted/50"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-card-foreground line-clamp-1">
                  {assignment.title}
                </h4>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {assignment.course}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {assignment.dueDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {assignment.dueTime}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    assignment.status === "active"
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {assignment.status === "active" ? "Active" : "Upcoming"}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-card-foreground">
                    {assignment.submissions}
                  </span>
                  /{assignment.total} submitted
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
