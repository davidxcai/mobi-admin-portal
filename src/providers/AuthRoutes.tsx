import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "../features/layout/Layout";
import { useAuthContext } from "./AuthProvider";
import { isAdmin } from "../hooks";

export function AuthRoutes() {
    const session = useAuthContext();
    const isAuthorized = isAdmin(session);

    return session && isAuthorized ? (
        <Navigate to="/dashboard" replace />
    ) : (
        <Layout>
            <Outlet />
        </Layout>
    );
}
