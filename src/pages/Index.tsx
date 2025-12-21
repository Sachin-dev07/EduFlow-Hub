import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingAssignments } from "@/components/dashboard/UpcomingAssignments";
import { StudentProgress } from "@/components/dashboard/StudentProgress";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Users, BookOpen, FileText, TrendingUp, Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CreateCourseModal from "@/components/courses/CreateCourseModal";

const courses = [
  {
    title: "Introduction to Algebra",
    subject: "Mathematics",
    students: 32,
    progress: 68,
    lessons: 24,
    duration: "6 weeks remaining",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    title: "World History: Modern Era",
    subject: "History",
    students: 28,
    progress: 45,
    lessons: 18,
    duration: "8 weeks remaining",
    color: "bg-gradient-to-br from-amber-500 to-orange-500",
  },
  {
    title: "Biology Fundamentals",
    subject: "Science",
    students: 30,
    progress: 82,
    lessons: 20,
    duration: "3 weeks remaining",
    color: "bg-gradient-to-br from-emerald-500 to-teal-500",
  },
  {
    title: "English Literature",
    subject: "Language Arts",
    students: 26,
    progress: 55,
    lessons: 16,
    duration: "7 weeks remaining",
    color: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
];

const Index = () => {
  const [showCourseModal, setShowCourseModal] = useState(false);

  const handleCourseCreated = () => {
    window.location.reload(); // Refresh to show new course
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back, Michael! 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here's what's happening with your classes today.
            </p>
          </div>
          <Button
            variant="gradient"
            size="lg"
            className="gap-2"
            onClick={() => setShowCourseModal(true)}
          >
            <Plus className="h-5 w-5" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
          <StatCard
            title="Total Students"
            value="1,234"
            subtitle="Across all courses"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "50ms" }}>
          <StatCard
            title="Active Courses"
            value="8"
            subtitle="2 starting this week"
            icon={BookOpen}
            variant="accent"
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <StatCard
            title="Assignments"
            value="24"
            subtitle="12 pending review"
            icon={FileText}
            variant="success"
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "150ms" }}>
          <StatCard
            title="Avg. Performance"
            value="85%"
            subtitle="Class average"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            variant="default"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <QuickActions />
      </div>

      {/* Courses Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Your Courses</h2>
          <Button variant="ghost" className="text-primary">
            View all courses
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className="animate-slide-up"
              style={{ animationDelay: `${250 + index * 50}ms` }}
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="animate-slide-up lg:col-span-1" style={{ animationDelay: "450ms" }}>
          <RecentActivity />
        </div>
        <div className="animate-slide-up lg:col-span-1" style={{ animationDelay: "500ms" }}>
          <UpcomingAssignments />
        </div>
        <div className="animate-slide-up lg:col-span-1" style={{ animationDelay: "550ms" }}>
          <StudentProgress />
        </div>
      </div>

      {/* Parent Portal Link */}
      <div className="mt-8 animate-slide-up" style={{ animationDelay: "600ms" }}>
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Parent Portal</h3>
              <p className="text-sm text-muted-foreground">
                Access the parent view to see how parents experience the platform
              </p>
            </div>
            <Link to="/parent">
              <Button variant="accent" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Parent Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Create Course Modal */}
      <CreateCourseModal
        open={showCourseModal}
        onClose={() => setShowCourseModal(false)}
        onCreated={handleCourseCreated}
      />
    </MainLayout>
  );
};

export default Index;
