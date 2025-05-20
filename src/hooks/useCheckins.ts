import { supabase } from "./supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUpdateProfileMomocoins, useIncrementEventAttendance } from "./index";
import { CheckInData } from "../types/models";
import { useCurrentEvent } from "../providers/CurrentEventProvider";
import { Event } from "../types/models";
import { User } from "@supabase/supabase-js";

export function useGetEventCheckIns() {
    const { event } = useCurrentEvent();
    const allRows = `
        *,
        profile:profile_id(*),
        checked_in_by_profile:checked_in_by(*)
    `;

    return useQuery({
        queryKey: ["checkins", event?.id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("checkins")
                .select(allRows)
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

type createCheckInType = {
    attendee: string;
    event: Event;
    admin: User;
}

export function useCreateCheckIn() {
    const queryClient = useQueryClient();
    const { mutate: updateProfileMomocoins } = useUpdateProfileMomocoins();
    const { mutate: incrementEventAttendance } = useIncrementEventAttendance();
    const returnData = `
        *,
        profile:profile_id (*),
        event:event_id (*),
        admin:checked_in_by (*)
    `;

    return useMutation({
        mutationFn: async ({
            attendee,
            event,
            admin,
        }: createCheckInType) => {
            const { data, error } = await supabase
            .from("checkins")
            .insert({
                event_id: event.id,
                profile_id: attendee,
                momocoins: event?.momocoins ?? 0,
                checked_in_by: admin?.id,
            })
            .select(returnData)
            .single();
            if (error) {
                console.error("useCreateCheckIn error:", error);
                throw new Error(error.message);
            }
            return data as unknown as CheckInData;
        },
        onSuccess: (data) => {
            console.log("check in success");
            queryClient.invalidateQueries({ queryKey: ["checkins"] });
            incrementEventAttendance(data.event_id);
            updateProfileMomocoins({ profile_id: data.profile_id, amount: data.momocoins });
        },
        onError: (error) => {
            console.error("useCreateCheckIn error:", error);
        },
    });
}
