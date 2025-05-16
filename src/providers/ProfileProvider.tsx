import { createContext, useContext, type ReactNode } from "react";
import { useGetUserProfile } from "../hooks";
import { Profile } from "../types/models";
import { useAuthContext } from "./AuthProvider";
// import { notifications } from "@mantine/notifications";
// import { Navigate } from "react-router";
// import { useLogout } from "../hooks/useAuth";

const ProfileContext = createContext<Profile | undefined | null>(null);

type ProfileProviderProps = {
    children: ReactNode;
};

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
    console.count("ProfileProvider");
    const session = useAuthContext();
    const profile = useGetUserProfile(session);
    // const isAuthorized = profile.data?.role === "admin";
    // const { mutate: logout } = useLogout();

    console.log("isPending:", profile.isPending);

    if (profile.isPending) {
        return <div>Loading profile...</div>;
    }

    if (profile.isError) {
        return <div>Error: {profile.error.message}</div>;
    }

    // if (!profile.data || !isAuthorized) {
    //   logout();
    //   notifications.show({
    //     title: "Unauthorized",
    //     message: "Only admins can access this application.",
    //     color: "red",
    //   });
    //   return <Navigate to="/login" />;
    // }

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
