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
} from "lucide-react";
import { cn } from "@/lib/utils";

const assignments = [
  {
    id: 1,
    title: "Algebra Homework Chapter 7",
    course: "Mathematics",
    teacher: "Ms. Johnson",
    dueDate: "Dec 10, 2024",
    dueTime: "11:59 PM",
    status: "pending",
    description: "Complete problems 1-25 from Chapter 7. Show all work.",
    resources: ["Textbook Ch. 7", "Practice Problems PDF"],
  },
  {
    id: 2,
    title: "Lab Report: Photosynthesis",
    course: "Biology",
    teacher: "Mr. Smith",
    dueDate: "Dec 12, 2024",
    dueTime: "3:00 PM",
    status: "in-progress",
    description: "Write a detailed lab report on the photosynthesis experiment conducted in class.",
    resources: ["Lab Report Template", "Experiment Data"],
    progress: 60,
  },
  {
    id: 3,
    title: "Essay: World War II Impact",
    course: "History",
    teacher: "Mr. Brown",
    dueDate: "Dec 14, 2024",
    dueTime: "5:00 PM",
    status: "pending",
    description: "Write a 1500-word essay analyzing the global impact of World War II.",
    resources: ["Essay Guidelines", "Research Sources"],
  },
  {
    id: 4,
    title: "Poetry Analysis",
    course: "English Literature",
    teacher: "Mrs. Davis",
    dueDate: "Dec 8, 2024",
    dueTime: "11:59 PM",
    status: "submitted",
    description: "Analyze the poem 'The Road Not Taken' by Robert Frost.",
    submittedDate: "Dec 7, 2024",
    grade: 92,
  },
  {
    id: 5,
    title: "Chapter 6 Quiz",
    course: "Mathematics",
    teacher: "Ms. Johnson",
    dueDate: "Dec 5, 2024",
    dueTime: "In class",
    status: "graded",
    grade: 95,
    feedback: "Excellent work! Great understanding of the material.",
  },
  {
    id: 6,
    title: "Cell Biology Test",
    course: "Biology",
    teacher: "Mr. Smith",
    dueDate: "Dec 3, 2024",
    dueTime: "In class",
    status: "graded",
    grade: 88,
    feedback: "Good effort. Review mitosis section for improvement.",
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-muted text-muted-foreground", icon: Clock },
  "in-progress": { label: "In Progress", color: "bg-warning/10 text-warning", icon: AlertCircle },
  submitted: { label: "Submitted", color: "bg-primary/10 text-primary", icon: FileText },
  graded: { label: "Graded", color: "bg-success/10 text-success", icon: CheckCircle },
};

const ParentAssignments = () => {
  const pendingAssignments = assignments.filter(a => a.status === "pending" || a.status === "in-progress");
  const completedAssignments = assignments.filter(a => a.status === "submitted" || a.status === "graded");

  return (
    <ParentLayout>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Emma's Assignments
            </h1>
            <p className="mt-1 text-muted-foreground">
              Track upcoming and completed assignments
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4 animate-slide-up">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Due This Week</p>
          <p className="mt-1 text-3xl font-bold text-warning">3</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="mt-1 text-3xl font-bold text-primary">1</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="mt-1 text-3xl font-bold text-success">12</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Average Grade</p>
          <p className="mt-1 text-3xl font-bold text-accent">91%</p>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="animate-slide-up">
        <TabsList className="mb-6 bg-muted/50">
          <TabsTrigger value="upcoming">Upcoming ({pendingAssignments.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedAssignments.length})</TabsTrigger>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {pendingAssignments.map((assignment, index) => (
            <AssignmentCard key={assignment.id} assignment={assignment} index={index} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedAssignments.map((assignment, index) => (
            <AssignmentCard key={assignment.id} assignment={assignment} index={index} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {assignments.map((assignment, index) => (
            <AssignmentCard key={assignment.id} assignment={assignment} index={index} />
          ))}
        </TabsContent>
      </Tabs>
    </ParentLayout>
  );
};

function AssignmentCard({ assignment, index }: { assignment: typeof assignments[0]; index: number }) {
  const status = statusConfig[assignment.status as keyof typeof statusConfig];
  const StatusIcon = status.icon;

  return (
    <div
      className="rounded-xl border border-border bg-card shadow-card overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              status.color
            )}>
              <StatusIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{assignment.title}</h3>
              <p className="text-sm text-muted-foreground">{assignment.course} • {assignment.teacher}</p>
              {assignment.description && (
                <p className="mt-2 text-sm text-muted-foreground">{assignment.description}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {assignment.dueDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {assignment.dueTime}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
              status.color
            )}>
              {status.label}
            </span>
            {assignment.grade !== undefined && (
              <span className={cn(
                "text-2xl font-bold",
                assignment.grade >= 90 ? "text-success" :
                assignment.grade >= 80 ? "text-primary" : "text-warning"
              )}>
                {assignment.grade}%
              </span>
            )}
          </div>
        </div>

        {/* Progress bar for in-progress assignments */}
        {assignment.status === "in-progress" && assignment.progress !== undefined && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-card-foreground">{assignment.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${assignment.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Feedback for graded assignments */}
        {assignment.feedback && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-card-foreground">Teacher Feedback:</span> {assignment.feedback}
            </p>
          </div>
        )}

        {/* Resources */}
        {assignment.resources && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-medium text-card-foreground mb-2">Resources:</p>
            <div className="flex flex-wrap gap-2">
              {assignment.resources.map((resource, i) => (
                <Button key={i} variant="outline" size="sm" className="gap-1.5 text-xs">
                  <ExternalLink className="h-3 w-3" />
                  {resource}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParentAssignments;
