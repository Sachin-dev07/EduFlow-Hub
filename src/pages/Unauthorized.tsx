import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Unauthorized = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleGoBack = () => {
        if (user) {
            // Redirect to appropriate dashboard based on role
            if (user.role === "teacher") navigate("/");
            else if (user.role === "parent") navigate("/parent");
            else if (user.role === "student") navigate("/student");
            else navigate("/");
        } else {
            navigate("/login");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-black overflow-hidden selection:bg-red-500/30">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-red-500/10 blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 blur-[120px] animate-pulse delay-1000" />

            <div className="relative z-10 w-full max-w-md p-4">
                <div className="glass-card rounded-3xl border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-2xl shadow-xl p-8 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 shadow-inner">
                            <ShieldAlert className="h-12 w-12 text-red-500" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold mb-3 text-foreground tracking-tight">Access Denied</h1>
                    <p className="text-muted-foreground mb-8 text-lg">
                        You don't have permission to view this page.
                        {user && (
                            <span className="block mt-4 text-sm bg-white/30 dark:bg-white/10 py-2 px-4 rounded-full inline-block border border-white/10">
                                Current Role: <span className="font-bold uppercase tracking-wider text-red-500">{user.role}</span>
                            </span>
                        )}
                    </p>

                    <div className="space-y-4">
                        <Button
                            onClick={handleGoBack}
                            className="w-full gap-2 h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Return to Dashboard
                        </Button>

                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full h-12 rounded-xl text-base font-medium border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 bg-transparent transition-all"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
