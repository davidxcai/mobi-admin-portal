import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const session = useAuth();
  if (!session) {
    navigate("/login");
    return null;
  }
  return <>{children}</>;
}
