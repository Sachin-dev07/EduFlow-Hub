import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
  GraduationCap,
  ChevronLeft,
  LogOut,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

/* ---------------- ROLE BASED NAV ---------------- */

const NAV_BY_ROLE = {
  admin: [
    { name: "Admin Panel", href: "/admin", icon: Shield },
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Assignments", href: "/assignments", icon: FileText },
    { name: "Students", href: "/students", icon: Users },
    { name: "Grades", href: "/grades", icon: BarChart3 },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Settings", href: "/settings", icon: Settings },
  ],
  teacher: [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Assignments", href: "/assignments", icon: FileText },
    { name: "Students", href: "/students", icon: Users },
    { name: "Grades", href: "/grades", icon: BarChart3 },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Settings", href: "/settings", icon: Settings },
  ],
  parent: [
    { name: "Dashboard", href: "/parent", icon: LayoutDashboard },
    { name: "Assignments", href: "/parent/assignments", icon: FileText },
    { name: "Grades", href: "/parent/grades", icon: BarChart3 },
    { name: "Messages", href: "/parent/messages", icon: MessageSquare },
  ],
  student: [
    { name: "Dashboard", href: "/student", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Assignments", href: "/assignments", icon: FileText },
    { name: "Grades", href: "/grades", icon: BarChart3 },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Settings", href: "/settings", icon: Settings },
  ],
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  const navigation = NAV_BY_ROLE[user.role];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl transition-all duration-300 dark:bg-black/40 dark:border-white/10",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              EduFlow
            </span>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-white/20 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft
            className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary shadow-sm border border-primary/10"
                  : "text-muted-foreground hover:bg-white/40 hover:text-foreground hover:shadow-sm"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
              {!collapsed && item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-white/10 p-4 bg-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-accent to-emerald-500 text-white font-bold shadow-md">
            {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-foreground">{user.name || "User"}</p>
              <p className="text-xs text-muted-foreground capitalize truncate">
                {user.role}
              </p>
            </div>
          )}

          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
