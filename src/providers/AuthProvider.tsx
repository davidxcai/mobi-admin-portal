import { createContext, useContext } from "react";
import { Session } from "@supabase/supabase-js";
import { Profile } from "../types/models";
import { useAuthSync } from "../hooks/useAuth";

type AuthContextType = {
  session: Session | null;
  profile: Profile | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Synchronizes your session with supabase
  // Updates automatically when the session changes
  const { session, profile, loading } = useAuthSync();

  if (loading) {
    //Possibly load skeleton
    return <div>Loading auth...</div>;
  }

  return (
    <AuthContext.Provider value={{ session, profile }}>
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
