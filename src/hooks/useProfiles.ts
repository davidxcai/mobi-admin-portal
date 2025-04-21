import { supabase } from "./supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Profile } from "../types/models";
import { useGetUser } from "./useAuth";

export function useGetAllProfiles() {
    const getAllProfilesQuery = useQuery({
        queryKey: ["profiles"],
        queryFn: async () => {
            const { data, error } = await supabase
            .from("profiles")
            .select("*");
            if (error) {
                throw new Error(error.message);
            }
            return data as Profile[];
        },
        refetchOnWindowFocus: false,
    });
    return getAllProfilesQuery;
}

export function useGetUserProfile() {
    const { data: user } = useGetUser();
    const getProfileQuery = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user?.id)
            .single();
            if (error) {
                throw new Error(error.message);
            }
            return data as Profile;
        },
        refetchOnWindowFocus: false,
    });
    return getProfileQuery;
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const updateProfileMutation = useMutation({
        mutationFn: async (profile: Profile) => {
            const { error } = await supabase
            .from("profiles")
            .update(profile)
            .eq("id", profile.id);
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            notifications.show({
                title: "Profile updated",
                message: "Your profile has been updated successfully.",
                color: "green",
            });
        },
        onError: (error) => {
            notifications.show({
                title: "Profile update failed",
                message: error.message,
                color: "red",
            });
        },
    });
    return updateProfileMutation;
}