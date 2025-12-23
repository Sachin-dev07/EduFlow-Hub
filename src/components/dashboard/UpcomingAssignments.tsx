import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAssignments } from "@/api/assignmentApi";

export function UpcomingAssignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();
        // Filter for upcoming/active assignments and sort by due date
        const upcoming = data
          .filter((a: any) => new Date(a.dueDate) > new Date())
          .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
          .slice(0, 4);
        setAssignments(upcoming);
      } catch (error) {
        console.error("Failed to fetch upcoming assignments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading specific assignments...</div>;
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-border p-5">
        <h3 className="text-lg font-semibold text-card-foreground">
          Upcoming Assignments
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:bg-primary/10"
          onClick={() => navigate("/assignments")}
        >
          View all
        </Button>
      </div>
      <div className="divide-y divide-border">
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <div
              key={assignment._id}
              onClick={() => navigate("/assignments")}
              className="group p-4 transition-all duration-200 hover:bg-muted/80 cursor-pointer active:scale-[0.99]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {assignment.title}
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {assignment.course?.title || assignment.subject || "General"}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(assignment.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-transform group-hover:scale-110",
                      "bg-primary/10 text-primary"
                    )}
                  >
                    {new Date(assignment.dueDate) < new Date(Date.now() + 86400000 * 2) ? "Upcoming" : "Active"}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium text-card-foreground">
                      {assignment.submissions?.length || 0}
                    </span>
                    /30 submitted
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">No upcoming assignments</div>
        )}
      </div>
    </div>
  );
}
