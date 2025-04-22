import { supabase } from "./supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { CheckInData } from "../types/models";
import { useCurrentEvent } from "../context/CurrentEventContext";
import { Event } from "../types/models";
import { User } from "@supabase/supabase-js";

export function useGetEventCheckIns() {
  const { event } = useCurrentEvent();

  const getEventCheckinsQuery = useQuery({
    queryKey: ["checkins"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("checkins")
        .select(
          `
            *,
            profile:profiles!profile_id(*),
            checked_in_by_profile:profiles!checked_in_by(*)
            `
        )
        .eq("event_id", event?.id)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data as CheckInData[];
    },
    enabled: !!event,
    refetchOnWindowFocus: false,
  });
  return getEventCheckinsQuery;
}

export function useCreateCheckIn() {
  const queryClient = useQueryClient();

  const createCheckInMutation = useMutation({
    mutationFn: async ({
      profileId,
      event,
      user,
    }: {
      profileId: string;
      event: Event;
      user: User;
    }) => {
      if (!event) {
        throw new Error("Event not found");
      }
      if (!user) {
        throw new Error("User not found");
      }
      const { data, error } = await supabase
        .from("checkins")
        .insert({
          event_id: event.id,
          profile_id: profileId,
          momocoins: event?.momocoins ?? 0,
          checked_in_by: user?.id,
        })
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      notifications.show({
        title: "Check-in successful",
        message: "You have successfully checked in.",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["checkins"] });
    },
    onError: (error) => {
      notifications.show({
        title: "Check-in failed",
        message: error.message,
        color: "red",
      });
    },
  });

  return createCheckInMutation;
}
