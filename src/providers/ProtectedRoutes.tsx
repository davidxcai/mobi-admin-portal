import { Navigate, Outlet } from "react-router-dom";
import { CurrentEventProvider } from "./CurrentEventProvider";
import { ProfileProvider } from "./ProfileProvider";
import { Layout } from "../features/layout/Layout";
import { useAuthContext } from "./AuthProvider";
import { isAdmin, useLogout } from "../hooks";
import { ModalsProvider } from "@mantine/modals";

export function ProtectedRoutes() {
  const session = useAuthContext();
  const isAuthorized = isAdmin(session);
  const { mutate: logout } = useLogout();

  if (!session) return <Navigate to="/login" replace />;
  if (!isAuthorized) logout();

  return (
    <CurrentEventProvider>
      <ProfileProvider>
        <Layout>
          <ModalsProvider>
            <Outlet />
          </ModalsProvider>
        </Layout>
      </ProfileProvider>
    </CurrentEventProvider>
  );
}
