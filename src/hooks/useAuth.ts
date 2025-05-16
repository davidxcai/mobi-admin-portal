import { supabase } from "./supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

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
    return useMutation({
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
            queryClient.setQueryData(["session"], session);
            console.log("Login successful");
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
            const { data: { session }, error } = await supabase.auth.getSession();
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
