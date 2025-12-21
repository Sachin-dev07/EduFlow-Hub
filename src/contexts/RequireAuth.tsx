import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const RequireAuth = ({ allowed }: { allowed: string[] }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowed.includes(user.role))
    return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default RequireAuth;
