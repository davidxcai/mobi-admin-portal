import { supabase } from "./supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    useUpdateProfileMomocoins,
    useIncrementEventAttendance,
} from "./index";
import { CheckInData } from "../types/models";
import { useCurrentEvent } from "../providers/CurrentEventProvider";
import { Event } from "../types/models";
import { User } from "@supabase/supabase-js";

type createCheckInType = {
    attendee: string;
    event: Event;
    admin: User;
};

export function useGetEventCheckIns() {
    const { currentEvent } = useCurrentEvent();
    const allRows = `
        *,
        profile:profile_id(*),
        checked_in_by_profile:checked_in_by(*)
    `;

    return useQuery({
        queryKey: ["checkins", currentEvent?.id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("checkins")
                .select(allRows)
                .eq("event_id", currentEvent?.id)
                .order("created_at", { ascending: false });
            if (error) {
                throw new Error(error.message);
            }
            const checkins = data.map((checkin) => {
                return {
                    ...checkin,
                    created_at: new Date(checkin.created_at),
                };
            });
            return checkins as CheckInData[];
        },
        enabled: !!currentEvent,
        refetchOnWindowFocus: false,
        retry: 2,
        initialData: [],
    });
}

export function useGetAllCheckIns() {
    return useQuery({
        queryKey: ["checkins"],
        queryFn: async () => {
            const { data, error } = await supabase.from("checkins").select(`
                    *,
                    profile:profile_id(*),
                    event:event_id(*),
                    admin:checked_in_by(*)
                `);
            if (error) {
                throw new Error(error.message);
            }
            return data as CheckInData[];
        },
        retry: 2,
        initialData: [],
    });
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
        mutationFn: async ({ attendee, event, admin }: createCheckInType) => {
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
            incrementEventAttendance(data.event_id);
            updateProfileMomocoins({
                profile_id: data.profile_id,
                amount: data.momocoins,
            });
            queryClient.invalidateQueries({ queryKey: ["checkins"] });
        },
        onError: (error) => {
            console.error("useCreateCheckIn error:", error);
        },
    });
}
