import { useEffect, useState } from "react";
import { ParentLayout } from "@/components/layout/ParentLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAssignments } from "@/api/assignmentApi";
import { useToast } from "@/hooks/use-toast";

interface Assignment {
  _id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: string;
  createdBy: {
    name: string;
    email: string;
  };
  description?: string;
}

const ParentAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();
        // Ensure data is an array
        setAssignments(Array.isArray(data) ? data : []);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch assignments",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [toast]);

  // Mock filtering for demo purposes
  const pendingAssignments = assignments.filter((_, i) => i % 2 === 0);
  const completedAssignments = assignments.filter((_, i) => i % 2 !== 0);

  if (loading) {
    return (
      <ParentLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ParentLayout>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-purple-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <ParentLayout>
        {/* Header */}
        <div className="mb-8 animate-fade-in relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Performance Check
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Review academic tasks and progress
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-4 animate-slide-up relative z-10">
          <div className="glass-card rounded-2xl p-6 border border-white/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm font-medium text-muted-foreground">Due This Week</p>
            <p className="mt-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-600 to-orange-600">
              {pendingAssignments.length}
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm font-medium text-muted-foreground">In Progress</p>
            <p className="mt-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600">
              2
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <p className="mt-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-emerald-600">
              {completedAssignments.length}
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
            <p className="mt-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600">
              91%
            </p>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="animate-slide-up relative z-10">
          <TabsList className="mb-6 bg-white/40 dark:bg-black/40 backdrop-blur-md p-1 border border-white/20 h-auto rounded-full w-full sm:w-auto">
            <TabsTrigger
              value="upcoming"
              className="rounded-full px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
            >
              Upcoming ({pendingAssignments.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-full px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
            >
              Completed ({completedAssignments.length})
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="rounded-full px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
            >
              All Assignments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {pendingAssignments.length > 0 ? (
              pendingAssignments.map((assignment, index) => (
                <AssignmentCard key={assignment._id} assignment={assignment} index={index} status="pending" />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedAssignments.length > 0 ? (
              completedAssignments.map((assignment, index) => (
                <AssignmentCard key={assignment._id} assignment={assignment} index={index} status="submitted" />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <AssignmentCard key={assignment._id} assignment={assignment} index={index} status={index % 2 === 0 ? "pending" : "submitted"} />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>
        </Tabs>
      </ParentLayout>
    </div>
  );
};

const EmptyState = () => (
  <div className="glass-card rounded-3xl p-12 text-center border border-white/20 flex flex-col items-center justify-center min-h-[300px]">
    <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
      <FileText className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-semibold text-foreground">No assignments found</h3>
    <p className="text-muted-foreground max-w-sm mt-2">
      Everything looks caught up! Check back later for new tasks.
    </p>
  </div>
);

function AssignmentCard({
  assignment,
  index,
  status = "pending"
}: {
  assignment: Assignment;
  index: number;
  status: "pending" | "in-progress" | "submitted" | "graded";
}) {
  const statusConfig = {
    pending: { label: "Pending", color: "text-amber-600 bg-amber-500/10 border-amber-500/20", icon: Clock },
    "in-progress": { label: "In Progress", color: "text-blue-600 bg-blue-500/10 border-blue-500/20", icon: AlertCircle },
    submitted: { label: "Submitted", color: "text-green-600 bg-green-500/10 border-green-500/20", icon: CheckCircle },
    graded: { label: "Graded", color: "text-purple-600 bg-purple-500/10 border-purple-500/20", icon: FileText },
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-white/50 dark:hover:bg-zinc-900/50 animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shine pointer-events-none" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-md",
            currentStatus.color
          )}>
            <StatusIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {assignment.title}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">
              {assignment.subject} • {assignment.createdBy?.name || "Teacher"}
            </p>
            {assignment.description && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {assignment.description}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/30 dark:bg-black/30 border border-white/10">
                <Calendar className="h-4 w-4 text-purple-500" />
                {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/30 dark:bg-black/30 border border-white/10">
                <Clock className="h-4 w-4 text-blue-500" />
                11:59 PM
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border backdrop-blur-md",
            currentStatus.color
          )}>
            {currentStatus.label}
          </span>
          {status === "graded" && (
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-emerald-600">
              92%
            </span>
          )}

          <Button variant="ghost" className="h-8 w-8 rounded-full p-0 hover:bg-white/20">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ParentAssignments;
