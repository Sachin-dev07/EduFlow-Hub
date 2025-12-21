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
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="pl-64 transition-all duration-300">
        {/* 🔹 TOP BAR (ONLY ADDED PART) */}
        <div className="flex justify-end items-center gap-3 px-6 py-3 border-b bg-background">
          
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
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>

              <Button
                variant="outline"
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
