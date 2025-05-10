import { supabase } from "./supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Profile } from "../types/models";

export function useGetAllProfiles() {
  const getAllProfilesQuery = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return (data as Profile[]) || [];
    },
    refetchOnWindowFocus: false,
  });
  return getAllProfilesQuery;
}

export function useGetUserProfile(session: Session | null) {
  const getProfileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data as Profile;
    },
    enabled: session !== null,
    refetchOnWindowFocus: false,
  });
  return getProfileQuery;
}

export function useGetAllPendingProfiles() {
  const getAllPendingProfilesQuery = useQuery({
    queryKey: ["pendingProfiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("account_status", "pending");
      if (error) {
        throw new Error(error.message);
      }
      return data as Profile[];
    },
    refetchOnWindowFocus: false,
  });
  return getAllPendingProfilesQuery;
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

export function useCreateProfile() {
  const queryClient = useQueryClient();
  const createProfileMutation = useMutation({
    mutationFn: async (profile: Profile) => {
      const { data, error } = await supabase
        .from("profiles")
        .insert([profile])
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data as Profile;
    },
    onSuccess: (data) => {
      notifications.show({
        title: "Profile created",
        message: `Profile ${data.first_name} created successfully`,
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      notifications.show({
        title: "Error creating profile",
        message: error.message,
        color: "red",
      });
    },
  });
  return createProfileMutation;
}

export function usePromoteToAdmin() {
  const queryClient = useQueryClient();
  const promoteToAdminMutation = useMutation({
    mutationFn: async (profileId: string) => {
      const { error } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", profileId);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      notifications.show({
        title: "Profile promoted",
        message: "Profile has been promoted to admin successfully.",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Profile promotion failed",
        message: error.message,
        color: "red",
      });
    },
  });
  return promoteToAdminMutation;
}