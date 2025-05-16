import { createContext, useContext, type ReactNode } from "react";
import { useGetUserProfile } from "../hooks";
import { Profile } from "../types/models";
import { useAuthContext } from "./AuthProvider";

const ProfileContext = createContext<Profile | undefined | null>(null);

type ProfileProviderProps = {
  children: ReactNode;
};

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  console.count("ProfileProvider");
  const session = useAuthContext();
  const profile = useGetUserProfile(session);
  const isAuthorized = profile.data?.role === "admin";

  console.log("isPending:", profile.isPending);

  if (profile.isPending) {
    return <div>Loading profile...</div>;
  }

  if (profile.isError) {
    return <div>Error: {profile.error.message}</div>;
  }

  if (!profile.data || !isAuthorized) {
    return <div>Unauthorized</div>;
  }

  return (
    <ProfileContext.Provider value={profile.data}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
