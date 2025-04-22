import { supabase } from "./supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Event } from "../types/models";

export function useGetAllEvents() {
  const getAllEventsQuery = useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return (data as Event[]) || [];
    },
    refetchOnWindowFocus: false,
  });
  return getAllEventsQuery;
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  const createEventMutation = useMutation({
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
  return createEventMutation;
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  const updateEventMutation = useMutation({
    mutationFn: async (event: Event) => {
      const { data, error } = await supabase
        .from("events")
        .update(event)
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
      notifications.show({
        title: "Error updating event",
        message: error.message,
        color: "red",
      });
    },
  });
  return updateEventMutation;
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      notifications.show({
        title: "Event deleted",
        message: "Event deleted successfully",
        color: "green",
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
  return deleteEventMutation;
}
