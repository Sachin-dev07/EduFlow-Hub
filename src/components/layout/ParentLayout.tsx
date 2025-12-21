import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  MessageSquare,
  Settings,
  Bell,
  ChevronLeft,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navigation = [
  { name: "Overview", href: "/parent", icon: LayoutDashboard },
  { name: "Grades", href: "/parent/grades", icon: GraduationCap },
  { name: "Assignments", href: "/parent/assignments", icon: FileText },
  { name: "Messages", href: "/parent/messages", icon: MessageSquare },
];

interface ParentLayoutProps {
  children: ReactNode;
}

export function ParentLayout({ children }: ParentLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-primary/5">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-accent shadow-md">
              <Users className="h-5 w-5 text-accent-foreground" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-lg font-semibold text-sidebar-foreground">
                  Parent Portal
                </span>
                <p className="text-xs text-muted-foreground">EduLearn</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                collapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                {!collapsed && <span>{item.name}</span>}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Back to main */}
        <div className="border-t border-sidebar-border p-3">
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
            {!collapsed && <span>Back to Main</span>}
          </NavLink>
        </div>

        {/* Parent info */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-primary" />
              <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-sidebar bg-success" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  John Davis
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  Parent of Emma
                </p>
              </div>
            )}
            {!collapsed && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <Bell className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64 transition-all duration-300">
        <div className="min-h-screen p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
