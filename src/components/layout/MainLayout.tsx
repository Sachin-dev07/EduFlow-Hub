import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar />

      <main className="pl-64 transition-all duration-300">
        {/* 🔹 TOP BAR (ONLY ADDED PART) */}
        <div className="flex justify-end items-center gap-3 px-6 py-3 border-b border-white/20 bg-white/40 backdrop-blur-md sticky top-0 z-50 shadow-sm">

          {/* ❌ NOT LOGGED IN */}
          {!user && (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>

              <Link to="/signup">
                <Button variant="gradient">Create Account</Button>
              </Link>
            </>
          )}

          {/* ✅ LOGGED IN */}
          {user && (
            <>
              <span className="text-sm font-medium text-muted-foreground bg-white/30 px-3 py-1 rounded-full border border-white/10">
                {user.email}
              </span>

              <Button
                variant="outline"
                className="bg-white/20 border-white/20 hover:bg-white/40 text-destructive hover:text-destructive"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>

        {/* 🔹 PAGE CONTENT (UNCHANGED) */}
        <div className="min-h-screen p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
