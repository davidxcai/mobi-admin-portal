import { supabase } from "./supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateProfile } from "./useProfiles";
import type { Profile } from "../types/models";

export function usePromoteToAdmin() {
    const queryClient = useQueryClient();
    const updateProfile = useUpdateProfile();
    return useMutation({
        mutationFn: async (user: Profile) => {
            const { error } = await supabase
                .from("admins")
                .insert({ user_id: user.id });
            if (error) {
                throw new Error(error.message);
            }
            return user;
        },
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: ["profiles"] });
            const profile = {
                ...user,
                is_admin: true,
                role: "admin",
            }
            updateProfile.mutate(profile);
            console.log(`${user.first_name} successfully promoted to admin`);
        },
        onError: (error) => {
            console.error("usePromoteToAdmin error:", error);
        }
    })
}

export function useDemoteFromAdmin() {
    const queryClient = useQueryClient();
    const updateProfile = useUpdateProfile();
    return useMutation({
        mutationFn: async (user: Profile) => {
            const { error } = await supabase
                .from("admins")
                .delete()
                .eq("user_id", user.id);
            if (error) {
                throw new Error(error.message);
            }
            return user;
        },
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: ["profiles"] });
            const profile = {
                ...user,
                is_admin: false,
                role: "user",
            }
            updateProfile.mutate(profile);
            console.log(`${user.first_name} successfully demoted to user`);
        },
        onError: (error) => {
            console.error("useDemoteFromAdmin error:", error);
        }
    })
}