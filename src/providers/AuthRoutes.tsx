import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "../features/layout/Layout";
import { useAuthContext } from "./AuthProvider";

export function AuthRoutes() {
  const session = useAuthContext();

  return session ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Layout>
      <Outlet />
    </Layout>
  );
}
