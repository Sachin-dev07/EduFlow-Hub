import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Grid3X3, List, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getCourses } from "@/api/courseApi";
import CreateCourseModal from "@/components/courses/CreateCourseModal";

const Courses = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const refreshCourses = () => {
    getCourses().then((data) => {
      const formatted = data.map((course: any) => ({
        title: course.title,
        subject: course.subject,
        students: course.students || 0,
        progress: course.progress || 0,
        lessons: course.lessons || 0,
        duration: course.duration || "N/A",
        color: course.color || "bg-gradient-to-br from-blue-500 to-blue-600",
      }));
      setAllCourses(formatted);
    });
  };

  useEffect(() => {
    refreshCourses();
  }, []);

  const filteredCourses = allCourses.filter(
    (course: any) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-indigo-500/30">

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <MainLayout>
        {/* Page Header */}
        <div className="mb-8 animate-fade-in space-y-2 relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Course Catalog
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Manage your academic curriculum
              </p>
            </div>

            <Button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 gap-2 h-12 px-6 rounded-full text-white border-0 hover:scale-105 active:scale-95"
              onClick={() => setOpenModal(true)}
            >
              <Plus className="h-5 w-5" />
              Create Course
            </Button>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up relative z-10">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white/40 backdrop-blur-md border-white/20 shadow-sm focus:bg-white/60 focus:border-indigo-500/50 transition-all rounded-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-12 px-5 gap-2 bg-white/40 backdrop-blur-md border-white/20 hover:bg-white/60 rounded-full text-foreground/80">
              <Filter className="h-4 w-4" />
              Filter
            </Button>

            <div className="flex items-center rounded-full border border-white/20 bg-white/40 backdrop-blur-md p-1.5 shadow-sm">
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                className={cn("h-9 w-9 rounded-full transition-all", view === "grid" && "bg-white shadow-sm !text-indigo-600")}
                onClick={() => setView("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="icon"
                className={cn("h-9 w-9 rounded-full transition-all", view === "list" && "bg-white shadow-sm !text-indigo-600")}
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div
          className={cn(
            "grid gap-6 relative z-10",
            view === "grid"
              ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          )}
        >
          {filteredCourses.map((course: any, index: number) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in relative z-10">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 dark:bg-zinc-800/30 shadow-inner backdrop-blur-sm">
              <BookOpen className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              No courses found
            </h3>
            <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
              Try adjusting your search or create a new course to get started.
            </p>
          </div>
        )}

        {/* Create Course Modal */}
        <CreateCourseModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onCreated={refreshCourses}
        />
      </MainLayout>
    </div>
  );
};

export default Courses;
