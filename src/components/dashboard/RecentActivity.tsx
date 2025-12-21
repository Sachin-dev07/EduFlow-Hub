import { cn } from "@/lib/utils";
import { FileText, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "assignment",
    title: "Math Quiz submitted",
    student: "Emma Wilson",
    time: "2 minutes ago",
    icon: FileText,
    iconBg: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    type: "message",
    title: "New parent message",
    student: "From: John Davis (Parent)",
    time: "15 minutes ago",
    icon: MessageSquare,
    iconBg: "bg-accent/10 text-accent",
  },
  {
    id: 3,
    type: "completed",
    title: "Chapter 5 completed",
    student: "Class 10A - Science",
    time: "1 hour ago",
    icon: CheckCircle,
    iconBg: "bg-success/10 text-success",
  },
  {
    id: 4,
    type: "alert",
    title: "Assignment deadline approaching",
    student: "History Essay - Due tomorrow",
    time: "2 hours ago",
    icon: AlertCircle,
    iconBg: "bg-warning/10 text-warning",
  },
  {
    id: 5,
    type: "assignment",
    title: "Science Lab Report graded",
    student: "Michael Brown",
    time: "3 hours ago",
    icon: FileText,
    iconBg: "bg-primary/10 text-primary",
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <div className="border-b border-border p-5">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/50"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                activity.iconBg
              )}
            >
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {activity.student}
              </p>
            </div>
            <span className="flex-shrink-0 text-xs text-muted-foreground">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-3">
        <button className="w-full rounded-lg py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-primary/5">
          View all activity
        </button>
      </div>
    </div>
  );
}
