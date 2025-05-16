import { useEffect } from "react";
import { supabase } from "../hooks/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSession } from "../hooks";
import { createContext, useContext, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

const AuthContext = createContext<Session | null | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  console.count("AuthProvider");
  const queryClient = useQueryClient();
  const session = useGetSession();

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

  if (session.isPending) return <div>Loading session...</div>;

  if (session.isError) return <div>Error: {session.error.message}</div>;

  return (
    <AuthContext.Provider value={session.data}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
