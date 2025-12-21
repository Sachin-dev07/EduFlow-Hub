// src/pages/Assignments.tsx
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Calendar, MoreVertical, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getAssignments } from "@/api/assignmentApi";
import CreateAssignmentModal from "@/components/assignments/CreateAssignmentModal";
import { useAuth } from "@/contexts/AuthContext"; // ✅ Added for role-based logic

type Assignment = {
  _id?: string;
  title?: string;
  subject?: string;
  dueDate?: string;
  status?: string;
  submissions?: number;
  total?: number;
};

// Status pill colors
const statusColors: Record<string, string> = {
  pending: "bg-primary/10 text-primary border-primary/20",
  upcoming: "bg-primary/10 text-primary border-primary/20",
  active: "bg-success/10 text-success border-success/20",
  grading: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-muted text-muted-foreground border-muted",
};

const Assignments = () => {
  const { user } = useAuth(); // ✅ Get logged-in user + role

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load assignments from API
  const loadAssignments = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAssignments();

      const fixed = (Array.isArray(data) ? data : []).map((a: any) => ({
        status: "upcoming",
        ...a,
      })) as Assignment[];

      setAssignments(fixed);
    } catch (err: any) {
      console.error("Load assignments error:", err);
      setError(err.message || "Failed to load assignments");
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  // Search filter
  const filtered = assignments.filter((a) =>
    (a.title || "").toLowerCase().includes(search.toLowerCase())
  );

  // Status tab filter
  const filterByStatus = (status: string) => {
    if (status === "all") return filtered;
    return filtered.filter((a) => (a.status ?? "upcoming") === status);
  };

  // Assignment list component
  const AssignmentList = ({ items }: { items: Assignment[] }) => (
    <div className="space-y-4">
      {items.map((assignment, i) => (
        <div
          key={assignment._id ?? i}
          className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover animate-slide-up"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-semibold text-card-foreground">
                  {assignment.title || "Untitled"}
                </h3>

                <p className="mt-0.5 text-sm text-muted-foreground">
                  {assignment.subject || "General"}
                </p>

                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {assignment.dueDate || "No due date"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize",
                  statusColors[assignment.status ?? "upcoming"]
                )}
              >
                {assignment.status}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          No assignments in this category.
        </p>
      )}
    </div>
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
            <p className="mt-1 text-muted-foreground">
              Create, manage, and grade assignments
            </p>
          </div>

          {/* ✅ Show button only if user is TEACHER */}
          {user?.role === "teacher" && (
            <Button
              variant="gradient"
              size="lg"
              className="gap-2"
              onClick={() => setOpenCreate(true)}
            >
              <Plus className="h-5 w-5" />
              New Assignment
            </Button>
          )}
        </div>
      </div>

      {/* TABS */}
      <Tabs defaultValue="all" className="animate-slide-up">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="grading">Needs Grading</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search assignments..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all">
          {loading ? (
            <p className="py-10 text-center">Loading…</p>
          ) : (
            <AssignmentList items={filterByStatus("all")} />
          )}
        </TabsContent>

        <TabsContent value="active">
          <AssignmentList items={filterByStatus("active")} />
        </TabsContent>

        <TabsContent value="grading">
          <AssignmentList items={filterByStatus("grading")} />
        </TabsContent>

        <TabsContent value="completed">
          <AssignmentList items={filterByStatus("completed")} />
        </TabsContent>
      </Tabs>

      {/* Modal */}
      <CreateAssignmentModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={() => {
          setOpenCreate(false);
          loadAssignments();
        }}
      />

      {error && (
        <div className="text-center text-red-600 mt-4">
          Error loading assignments: {error}
        </div>
      )}
    </MainLayout>
  );
};

export default Assignments;
