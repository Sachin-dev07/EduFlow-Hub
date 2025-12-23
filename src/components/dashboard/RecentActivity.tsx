import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FileText, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAssignments } from "@/api/assignmentApi";

export function RecentActivity() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const assignments = await getAssignments();
        // different icons/colors based on something arbitrary or status
        const assignmentActivities = assignments.slice(0, 5).map((a: any, i: number) => ({
          id: a._id,
          type: "assignment", // could vary
          title: `New Assignment: ${a.title}`,
          student: a.course?.title || a.subject || "Course",
          time: new Date(a.createdAt || Date.now()).toLocaleDateString(),
          icon: FileText,
          iconBg: "bg-primary/10 text-primary",
          link: "/assignments"
        }));
        setActivities(assignmentActivities);
      } catch (error) {
        console.error("Failed to fetch activity", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading recent activity...</div>;
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <div className="border-b border-border p-5">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={activity.id}
              onClick={() => navigate(activity.link)}
              className="flex items-start gap-4 p-4 transition-all duration-200 hover:bg-muted/80 cursor-pointer group active:scale-[0.99]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
                  activity.iconBg
                )}
              >
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
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
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">No recent activity</div>
        )}
      </div>
      <div className="border-t border-border p-3">
        <button
          onClick={() => navigate("/messages")}
          className="w-full rounded-lg py-2 text-center text-sm font-medium text-primary transition-all hover:bg-primary/10 active:scale-95"
        >
          View all activity
        </button>
      </div>
    </div>
  );
}
