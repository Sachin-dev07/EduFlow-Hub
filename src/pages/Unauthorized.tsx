import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";
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
        } else {
            navigate("/login");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md p-8 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                        <ShieldAlert className="h-10 w-10 text-destructive" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
                <p className="text-muted-foreground mb-8">
                    You don't have permission to access this page.
                    {user && (
                        <span className="block mt-2">
                            Your current role: <span className="font-semibold capitalize">{user.role}</span>
                        </span>
                    )}
                </p>

                <div className="space-y-3">
                    <Button
                        onClick={handleGoBack}
                        variant="default"
                        className="w-full gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go to Dashboard
                    </Button>

                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
