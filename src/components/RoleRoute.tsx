import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/" replace />;
};
