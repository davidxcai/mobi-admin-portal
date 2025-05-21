import { createContext, ReactNode, useContext } from "react";
import { useGetAllProfiles } from "../../hooks";
import type { Profile } from "../../types/models";

const UsersContext = createContext<Profile[] | null | undefined>(undefined);

// Provides the profile for all users

export function UsersProvider({ children }: { children: ReactNode }) {
  const userProfiles = useGetAllProfiles();

  if (userProfiles.isPending) {
    return <div>Loading...</div>;
  }
  if (userProfiles.isError) {
    return <div>Error: {userProfiles.error.message}</div>;
  }

  return (
    <UsersContext.Provider value={userProfiles.data}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUserProfiles() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUserProfiles must be used within a UsersProvider");
  }
  return context;
}
