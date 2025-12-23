// src/pages/Assignments.tsx
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Calendar, MoreVertical, FileText, Loader2, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getAssignments } from "@/api/assignmentApi";
import CreateAssignmentModal from "@/components/assignments/CreateAssignmentModal";
import { useAuth } from "@/contexts/AuthContext";

type Assignment = {
  _id?: string;
  title?: string;
  subject?: string;
  dueDate?: string;
  status?: string;
  submissions?: number;
  total?: number;
};

// Status pill colors with enhanced styling
const statusColors: Record<string, string> = {
  pending: "text-amber-600 bg-amber-500/10 border-amber-500/20",
  upcoming: "text-blue-600 bg-blue-500/10 border-blue-500/20",
  active: "text-green-600 bg-green-500/10 border-green-500/20",
  grading: "text-purple-600 bg-purple-500/10 border-purple-500/20",
  completed: "text-slate-500 bg-slate-500/10 border-slate-500/20",
};

const Assignments = () => {
  const { user } = useAuth();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAssignments = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAssignments();
      const fixed = (Array.isArray(data) ? data : []).map((a: any) => ({
        status: "upcoming", // Default status if missing
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

  const filtered = assignments.filter((a) =>
    (a.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const filterByStatus = (status: string) => {
    if (status === "all") return filtered;
    return filtered.filter((a) => (a.status ?? "upcoming") === status);
  };

  const AssignmentList = ({ items }: { items: Assignment[] }) => (
    <div className="space-y-4">
      {items.map((assignment, i) => (
        <div
          key={assignment._id ?? i}
          className="group relative rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl p-6 shadow-sm transition-all hover:scale-[1.01] hover:shadow-lg hover:bg-white/50 animate-slide-up dark:bg-white/5 dark:hover:bg-white/10 overflow-hidden"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shine pointer-events-none" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg ring-2 ring-white/20">
                <FileText className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {assignment.title || "Untitled"}
                </h3>

                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {assignment.subject || "General"}
                </p>

                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 bg-white/30 dark:bg-black/20 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    {assignment.dueDate || "No due date"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur-md",
                  statusColors[assignment.status ?? "upcoming"]
                )}
              >
                {assignment.status}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 opacity-60 group-hover:opacity-100 transition-all hover:bg-white/20 rounded-full"
              >
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white/20 rounded-3xl backdrop-blur-md border border-white/20 text-center">
          <div className="h-16 w-16 mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <FileText className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <p className="text-lg font-medium text-muted-foreground">
            No assignments found in this view.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-violet-500/30">

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <MainLayout>
        {/* HEADER */}
        <div className="mb-8 animate-fade-in space-y-2 relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                Assignments
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Create and manage your course work
              </p>
            </div>

            {user?.role === "teacher" && (
              <Button
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg hover:shadow-violet-500/25 transition-all duration-300 gap-2 h-12 px-6 rounded-full text-white border-0 hover:scale-105 active:scale-95"
                onClick={() => setOpenCreate(true)}
              >
                <Plus className="h-5 w-5" />
                New Assignment
              </Button>
            )}
          </div>
        </div>

        {/* TABS */}
        <Tabs defaultValue="all" className="animate-slide-up relative z-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="bg-white/40 dark:bg-black/40 backdrop-blur-md p-1 border border-white/20 h-auto rounded-full w-fit">
              <TabsTrigger value="all" className="rounded-full px-5 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">All</TabsTrigger>
              <TabsTrigger value="active" className="rounded-full px-5 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Active</TabsTrigger>
              <TabsTrigger value="grading" className="rounded-full px-5 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Grading</TabsTrigger>
              <TabsTrigger value="completed" className="rounded-full px-5 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Completed</TabsTrigger>
            </TabsList>

            <div className="relative max-w-xs w-full group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-violet-500 transition-colors" />
              <Input
                placeholder="Search..."
                className="pl-10 h-11 bg-white/40 backdrop-blur-md border-white/20 shadow-sm focus:bg-white/60 focus:border-violet-500/50 transition-all rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="relative min-h-[300px]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-3xl border border-white/10 z-20">
                <Loader2 className="h-10 w-10 text-violet-600 animate-spin mb-4" />
                <p className="text-muted-foreground font-medium">Loading assignments...</p>
              </div>
            ) : null}

            <TabsContent value="all" className="mt-0">
              <AssignmentList items={filterByStatus("all")} />
            </TabsContent>

            <TabsContent value="active" className="mt-0">
              <AssignmentList items={filterByStatus("active")} />
            </TabsContent>

            <TabsContent value="grading" className="mt-0">
              <AssignmentList items={filterByStatus("grading")} />
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <AssignmentList items={filterByStatus("completed")} />
            </TabsContent>
          </div>
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
          <div className="text-center text-red-600 mt-6 bg-red-100/80 backdrop-blur-md p-4 rounded-xl border border-red-200 animate-in fade-in slide-in-from-bottom-2">
            Error loading assignments: {error}
          </div>
        )}
      </MainLayout>
    </div>
  );
};

export default Assignments;
