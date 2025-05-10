import { supabase } from "./supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Profile } from "../types/models";
import { Session } from "@supabase/supabase-js";

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

async function isAuthroized(userId: string): Promise<Profile> {
    const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
    if (error) throw new Error(error.message);
    if (!data) {
        throw new Error("User not found");
    }
    return data;
}

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const loginMutation = useMutation({
        mutationFn: async ({email, password}: {
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
        onSuccess: async ({session}) => {
            const profile = await isAuthroized(session.user.id);
            const authorized = profile.role === "admin" || profile.role === "superadmin";
            if (!authorized) {
                notifications.show({
                    title: "Unauthorized",
                    message: "You are not authorized to access this application.",
                    color: "red",
                });
                return;
            }
            queryClient.setQueryData(["profile"], profile);
            queryClient.setQueryData(["session"], session);
            navigate("/dashboard");
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
    return loginMutation;
}

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const logoutMutation = useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            console.log("Logout successful");
            queryClient.clear();
            navigate("/login");
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
    return logoutMutation;
}

export function useGetSession() {
    const getSessionQuery = useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                throw new Error(error.message);
            }
            return session;
        },
    });
    return getSessionQuery;
}

export function useGetUser() {
    const getSessionQuery = useQuery({
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
    return getSessionQuery;
}

export function useAuthSync() {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            if (_event === "INITIAL_SESSION" && session) {
                const { data: profileData, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", session.user.id)
                    .single();
                if (error) {
                    throw new Error(error.message);
                }
                setProfile(profileData);
            } else if (_event === "SIGNED_IN") {
                if (session) {
                    console.log("User signed in", session);
                }
            } else if (_event === "SIGNED_OUT") {
                console.log("User signed out");
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return { session, profile, loading };
}
