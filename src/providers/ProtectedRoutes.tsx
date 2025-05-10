import { useAuthContext } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
  const session = useAuthContext();

  return session ? <Outlet /> : <Navigate to="/login" replace />;
}
