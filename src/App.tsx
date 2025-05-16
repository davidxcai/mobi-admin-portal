import { MobiLogo } from "./components/MobiLogo";
import { Dashboard, Events, Users, Profile, Settings } from "./pages/";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./providers/ProtectedRoutes";
import { AuthRoutes } from "./providers/AuthRoutes";

import { AuthProvider } from "./providers/AuthProvider";

export function App() {
  console.count("App");

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthRoutes />}>
          <Route index element={<MobiLogo />} />
          <Route path="login" element={<MobiLogo />} />
          <Route path="register" element={<h1>Register</h1>} />
        </Route>

        {/* Authenticated routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="events" element={<Events />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Fallback route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}
