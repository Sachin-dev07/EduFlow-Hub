import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Grid3X3, List } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getCourses } from "@/api/courseApi"; 
import CreateCourseModal from "@/components/courses/CreateCourseModal";

// ✅ NEW

const Courses = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch courses from backend
  const [allCourses, setAllCourses] = useState([]);

  // Modal state
  const [openModal, setOpenModal] = useState(false);   // ✅ NEW

  // Function to refresh courses after adding new one
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
    <MainLayout>
      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Courses
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage and organize your courses
            </p>
          </div>

          <Button
            variant="gradient"
            size="lg"
            className="gap-2"
            onClick={() => setOpenModal(true)}   // ✅ OPEN MODAL
          >
            <Plus className="h-5 w-5" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          <div className="flex items-center rounded-lg border border-border bg-card p-1">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setView("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
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
          "grid gap-6",
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
        <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No courses found
          </h3>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Create Course Modal — MUST BE HERE */}
      <CreateCourseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={refreshCourses}
      />
    </MainLayout>
  );
};

export default Courses;
