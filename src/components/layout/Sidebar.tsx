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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

/* ---------------- ROLE BASED NAV ---------------- */

const NAV_BY_ROLE = {
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
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-sidebar transition-all",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          {!collapsed && <span className="text-lg font-semibold">EduFlow</span>}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={cn("h-4 w-4", collapsed && "rotate-180")}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-accent" />

          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user.role}
              </p>
            </div>
          )}

          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
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
