import { supabase } from "./supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import type { Profile } from "../types/models";

export function usePromoteAdmin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: Profile) => {
            console.log("Promoting user to admin:", user);
            const { error } = await supabase
                .from("admins")
                .insert({ user_id: user.id });
            if (error) {
                throw new Error(error.message);
            }
            return user;
        },
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: ["profiles", "profile"] });
            console.log(`${user.first_name} successfully promoted to admin`);
            notifications.show({
                title: "Success",
                message: `${user.first_name} successfully promoted to admin`,
                color: "teal",
            });
        },
        onError: (error) => {
            console.error("usePromoteToAdmin error:", error);
            notifications.show({
                title: "Error",
                message: error.message,
                color: "red",
            });
        }
    })
}

export function useDemoteAdmin() {
    const queryClient = useQueryClient();
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
            queryClient.invalidateQueries({ queryKey: ["profiles", "profile"] });
            console.log(`${user.first_name} successfully demoted to user`);
            notifications.show({
                title: "Success",
                message: `${user.first_name} successfully demoted to user`,
                color: "teal",
            });
        },
        onError: (error) => {
            console.error("useDemoteFromAdmin error:", error);
            notifications.show({
                title: "Error",
                message: error.message,
                color: "red",
            });
        }
    })
}

export function usePromoteSuperAdmin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: Profile) => {
            const { error } = await supabase
                .from("admins")
                .update({ is_super_admin: true })
                .eq("user_id", user.id);
            if (error) {
                throw new Error(error.message);
            }
            return user;
        },
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: ["profiles", "profile"] });
            console.log(`${user.first_name} successfully promoted to super admin`);
            notifications.show({
                title: "Success",
                message: `${user.first_name} successfully promoted to super admin`,
                color: "teal",
            });
        },
        onError: (error) => {
            console.error("usePromoteSuperAdmin error:", error);
            notifications.show({
                title: "Error",
                message: error.message,
                color: "red",
            });
        }
    })
}

export function useDemoteSuperAdmin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: Profile) => {
            const { error } = await supabase
                .from("admins")
                .update({ is_super_admin: false })
                .eq("user_id", user.id);
            if (error) {
                throw new Error(error.message);
            }
            return user;
        },
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: ["profiles", "profile"] });
            console.log(`${user.first_name} successfully demoted to admin`);
            notifications.show({
                title: "Success",
                message: `${user.first_name} successfully demoted to admin`,
                color: "teal",
            });
        },
        onError: (error) => {
            console.error("useDemoteSuperAdmin error:", error);
            notifications.show({
                title: "Error",
                message: error.message,
                color: "red",
            });
        }
    })
}

export function useGetAdmins() {
    return useQuery({
        queryKey: ["admins"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("admins")
                .select("*")
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        refetchOnWindowFocus: false,
    })
}