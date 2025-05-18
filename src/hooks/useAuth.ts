import { supabase } from "./supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AppJwtPayload {
    sub: string;
    aud: string;
    role: string;
    app_metadata?: {
        admin?: boolean;
    };
    [key: string]: any;
}

export function useRegister() {
    const navigate = useNavigate();
    // const { mutate : createProfile } = useCreateProfile();
    const registerMutation = useMutation({
        mutationFn: async (credentials: {
            email: string;
            password: string;
            first_name: string;
            last_name: string;
        }) => {
            const {
                data: { user },
                error: signUpError,
            } = await supabase.auth.signUp({
                email: credentials.email,
                password: credentials.password,
            });
            if (signUpError) {
                throw new Error(signUpError.message);
            }
            console.log("User signed up", user);

            const { error: profileError } = await supabase
                .from("profiles")
                .insert({
                    id: user?.id,
                    first_name: credentials.first_name,
                    last_name: credentials.last_name,
                });
            if (profileError) {
                throw new Error(profileError.message);
            }
        },
        onSuccess: (data) => {
            console.log("Registration successful", data);
            notifications.show({
                title: "Registration successful!",
                message: "Check your email for a confirmation link.",
                color: "green",
            });
            navigate("/login");
            // Handle successful registration here
        },
        onError: (error) => {
            console.error("Registration error", error);
            notifications.show({
                title: "Registration failed",
                message: error.message,
                color: "red",
            });
        },
    });
    return registerMutation;
}

export function useLogin() {
    const queryClient = useQueryClient();
    const { mutate: logout } = useLogout();
    return useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        onSuccess: async ({ session }) => {
            const isAuthorized = isAdmin(session);
            if (isAuthorized) {
                console.log("Login successful");
                queryClient.setQueryData(["session"], session);
            } else {
                console.log("User is not authorized");
                notifications.show({
                    title: "Login failed",
                    message:
                        "You are not authorized to access this application.",
                    color: "red",
                });
                await logout();
            }
        },
        onError: (error) => {
            console.error("Login error", error);
            notifications.show({
                title: "Login failed",
                message: error.message,
                color: "red",
            });
        },
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            console.log("Logout successful");
            queryClient.clear();
        },
        onError: (error) => {
            console.error("Logout error", error);
            notifications.show({
                title: "Logout failed",
                message: error.message,
                color: "red",
            });
        },
    });
}

export function useGetSession() {
    return useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();
            if (error) {
                throw new Error(error.message);
            }
            return session;
        },
    });
}

export function useGetUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                throw new Error(error.message);
            }
            return data.user;
        },
        refetchOnWindowFocus: false,
    });
}

export function isAdmin(session: Session | null): boolean | null {
    if (!session?.access_token) return null;
    try {
        const decoded = jwtDecode<AppJwtPayload>(session.access_token);
        return decoded.app_metadata?.admin ?? null;
    } catch (error) {
        console.warn("Failed to decode JWT:", error);
        return null;
    }
}
