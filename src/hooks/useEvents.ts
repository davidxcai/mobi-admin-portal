import { supabase } from "./supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Event } from "../types/models";
import type { User } from "@supabase/supabase-js";

export function useGetAllEvents() {
    return useQuery<Event[], Error>({
        queryKey: ["events"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*, profiles (*)");
            if (error) {
                throw new Error(error.message);
            }
            const events = data.map((event) => {
                return {
                    ...event,
                    created_at: new Date(event.created_at),
                    starts_at: new Date(event.starts_at),
                    ends_at: new Date(event.ends_at),
                };
            });
            console.log("Fetched events:", events);
            return (events as Event[]) || [];
        },
        refetchOnWindowFocus: false,
    });
}

export function useGetCurrentSemesterEvents() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed: Jan = 0, Jul = 6

    const semesterStart =
        month < 6 ? new Date(`${year}-01-01`) : new Date(`${year}-07-01`);

    return useQuery<Event[], Error>({
        queryKey: ["events"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*, profiles (*)")
                .gte("created_at", semesterStart.toISOString());
            if (error) {
                throw new Error(error.message);
            }
            const events = data.map((event) => {
                return {
                    ...event,
                    created_at: new Date(event.created_at),
                    starts_at: new Date(event.starts_at),
                    ends_at: new Date(event.ends_at),
                };
            });
            console.log("Fetched events:", events);
            return (events as Event[]) || [];
        },
        refetchOnWindowFocus: false,
    });
}

export function useCreateEvent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (event: Partial<Event>) => {
            const { data, error } = await supabase
                .from("events")
                .insert([event])
                .select()
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data as Event;
        },
        onSuccess: (data) => {
            notifications.show({
                title: "Event created",
                message: `Event ${data.title} created successfully`,
                color: "green",
            });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error) => {
            notifications.show({
                title: "Error creating event",
                message: error.message,
                color: "red",
            });
        },
    });
}

export function useUpdateEvent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (event: Event) => {
            const { profiles, ...rest } = event;
            // Remove the profiles from the event
            // profiles column does not exist in events table
            console.log("Updating event mutation:", rest);
            const { data, error } = await supabase
                .from("events")
                .update(rest)
                .eq("id", event.id)
                .select()
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data as Event;
        },
        onSuccess: (data) => {
            notifications.show({
                title: "Event updated",
                message: `Event ${data.title} updated successfully`,
                color: "green",
            });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error) => {
            console.error(error);
            notifications.show({
                title: "Error updating event",
                message: error.message,
                color: "red",
            });
        },
    });
}

export function useDeleteEvent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (event: Event) => {
            const { error } = await supabase
                .from("events")
                .delete()
                .eq("id", event.id);
            if (error) {
                throw new Error(error.message);
            }
            return event;
        },
        onSuccess: (event) => {
            notifications.show({
                title: "Event deleted",
                message: `Event: ${event.title} deleted successfully`,
                color: "teal",
            });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error) => {
            notifications.show({
                title: "Error deleting event",
                message: error.message,
                color: "red",
            });
        },
    });
}

export function useIncrementEventAttendance() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (eventId: number) => {
            console.log("Incrementing attendance for event:", eventId);
            const { error } = await supabase.rpc("increment_attendance", {
                event_id: eventId,
            });
            if (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["currentEvent"] });
            console.log("Attendance incremented successfully");
        },
        onError: (error) => {
            console.error("Error updating event attendance:", error);
        },
    });
}
