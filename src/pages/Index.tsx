import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingAssignments } from "@/components/dashboard/UpcomingAssignments";
import { StudentProgress } from "@/components/dashboard/StudentProgress";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Users, BookOpen, FileText, TrendingUp, Plus, ExternalLink, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CreateCourseModal from "@/components/courses/CreateCourseModal";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "User";

  const handleCourseCreated = () => {
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black overflow-hidden selection:bg-blue-500/30">

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <MainLayout>
        {/* Page Header */}
        <div className="mb-8 animate-fade-in space-y-2 relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Welcome back, {firstName}!
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Here's what's happening with your classes today.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 gap-2 h-12 px-6 rounded-full text-white border-0 hover:scale-105 active:scale-95"
                onClick={() => {
                  if (user?.role === "admin") {
                    setShowCourseModal(true);
                  } else {
                    alert("Only administrators can create new courses.");
                  }
                }}
              >
                <Plus className="h-5 w-5" />
                Create Course
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
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
        <div className="mb-10 animate-slide-up rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-xl p-8 dark:bg-black/40 relative z-10 hover:bg-white/50 transition-colors duration-500" style={{ animationDelay: "200ms" }}>
          <h2 className="text-xl font-bold mb-6 text-foreground">Quick Actions</h2>
          <QuickActions />
        </div>

        {/* Courses Section */}
        <div className="mb-10 relative z-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Courses</h2>
            <Link to="/courses">
              <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 group">
                View all courses <ExternalLink className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
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
        <div className="grid gap-8 lg:grid-cols-3 mb-10 relative z-10">
          <div className="animate-slide-up lg:col-span-1 rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg p-6 dark:bg-black/40 hover:scale-[1.01] transition-transform duration-300" style={{ animationDelay: "450ms" }}>
            <RecentActivity />
          </div>
          <div className="animate-slide-up lg:col-span-1 rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg p-6 dark:bg-black/40 hover:scale-[1.01] transition-transform duration-300" style={{ animationDelay: "500ms" }}>
            <UpcomingAssignments />
          </div>
          <div className="animate-slide-up lg:col-span-1 rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-lg p-6 dark:bg-black/40 hover:scale-[1.01] transition-transform duration-300" style={{ animationDelay: "550ms" }}>
            <StudentProgress />
          </div>
        </div>

        {/* Student/Parent View Toggle for Admins */}
        {user?.role === 'admin' && (
          <div className="animate-slide-up relative z-10" style={{ animationDelay: "600ms" }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-teal-500/20 bg-teal-500/5 backdrop-blur-sm p-8 relative overflow-hidden group hover:bg-teal-500/10 transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-teal-800 dark:text-teal-200">Parent Portal</h3>
                    <p className="text-muted-foreground mt-1 text-sm">Preview parent dashboard</p>
                  </div>
                  <Link to="/parent">
                    <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all rounded-full border-0">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Launch
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm p-8 relative overflow-hidden group hover:bg-cyan-500/10 transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-800 dark:text-cyan-200">Student Portal</h3>
                    <p className="text-muted-foreground mt-1 text-sm">Preview student dashboard</p>
                  </div>
                  <Link to="/student">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all rounded-full border-0">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Launch
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <CreateCourseModal
          open={showCourseModal}
          onClose={() => setShowCourseModal(false)}
          onCreated={handleCourseCreated}
        />
      </MainLayout>
    </div>
  );
};

export default Index;
