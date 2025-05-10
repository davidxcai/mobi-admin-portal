import { createContext, useContext, useEffect, useMemo } from "react";
import type { Session } from "@supabase/supabase-js";
import { useGetSession } from "../hooks/useAuth";
import { supabase } from "../hooks/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
  session: Session | null;
  sessionPending: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  console.count("AuthProvider");
  const queryClient = useQueryClient();
  const { data: session, isPending: sessionPending } = useGetSession();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      queryClient.setQueryData(["session"], session);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  const values = useMemo(
    () => ({
      session: session ?? null,
      sessionPending,
      isAuthenticated: !!session,
    }),
    [session, sessionPending]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
