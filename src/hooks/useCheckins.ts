import { supabase } from "./supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { CheckInData } from "../types/models";
import { useCurrentEvent } from "../providers/CurrentEventProvider";
import { Event } from "../types/models";
import { User } from "@supabase/supabase-js";

export function useGetEventCheckIns() {
    const { event } = useCurrentEvent();

    return useQuery({
        queryKey: ["checkins", event?.id],
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
}

export function useCreateCheckIn() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            attendee,
            event,
            admin,
        }: {
            attendee: string;
            event: Event;
            admin: User;
        }) => {
            const { data, error } = await supabase.from("checkins").insert({
                event_id: event.id,
                profile_id: attendee,
                momocoins: event?.momocoins ?? 0,
                checked_in_by: admin?.id,
            });
            if (error) {
                console.log("hook error", error);
                throw new Error(error.message);
            }
            return data;
        },
        onSuccess: () => {
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
}
