import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  roles: Array<"teacher" | "parent" | "student">;
};

const RequireAuth = ({ roles }: Props) => {
  const { user } = useAuth();

  // 🔴 NOT LOGGED IN → ALWAYS LOGIN
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔴 LOGGED IN BUT WRONG ROLE
  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
