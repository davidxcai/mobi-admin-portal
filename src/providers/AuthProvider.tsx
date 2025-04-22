import { createContext, useContext, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { useGetSession } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const AuthContext = createContext<Session | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending: sessionPending, isError } = useGetSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionPending) {
      return;
    } else if (!session && !sessionPending) {
      navigate("/login");
      notifications.show({
        title: "Not authenticated",
        message: "Please log in again.",
        color: "red",
      });
    }
  }, [session, sessionPending, navigate]);

  if (sessionPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error fetching session:", isError);
    return <div>Error fetching session</div>;
  }

  return (
    <AuthContext.Provider value={session ?? null}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
