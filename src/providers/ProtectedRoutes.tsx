import { Navigate, Outlet } from "react-router-dom";
import { CurrentEventProvider } from "./CurrentEventProvider";
import { ProfileProvider } from "./ProfileProvider";
import { Layout } from "../features/layout/Layout";
import { useAuthContext } from "./AuthProvider";

export function ProtectedRoutes() {
  const session = useAuthContext();

  if (!session) return <Navigate to="/login" replace />;

  return (
    <CurrentEventProvider>
      <ProfileProvider>
        <Layout>
          <Outlet />
        </Layout>
      </ProfileProvider>
    </CurrentEventProvider>
  );
}
