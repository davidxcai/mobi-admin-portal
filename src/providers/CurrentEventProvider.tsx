import {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
    ReactNode,
} from "react";
import { Event } from "../types/models";
import { notifications } from "@mantine/notifications";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "../hooks/supabaseClient";

interface CurrentEventContextProps {
    currentEvent: Event | undefined | null;
    setCurrentEvent: (event: Event | null) => void;
}

const CurrentEventContext = createContext<CurrentEventContextProps | undefined>(
    undefined
);

export function CurrentEventProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    // Detemines if there's an event to fetch from the database
    const [event, setEvent] = useState<Event | null>(null);
    const previousEventRef = useRef<Event | null>(null);

    const { data: currentEvent } = useQuery<Event | null>({
        queryKey: ["currentEvent"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .eq("id", event?.id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            const formatedData = {
                ...data,
                created_at: new Date(data.created_at),
                starts_at: new Date(data.starts_at),
                ends_at: new Date(data.ends_at),
            };
            return formatedData as Event;
        },
        enabled: !!event,
        refetchOnWindowFocus: false,
    });

    const setCurrentEvent = (event: Event | null) => {
        setEvent(event);
        queryClient.invalidateQueries({ queryKey: ["checkins"] });
        if (!event) {
            queryClient.setQueryData(["currentEvent"], null);
        }
    };

    useEffect(() => {
        if (event) {
            queryClient.invalidateQueries({ queryKey: ["currentEvent"] });
            notifications.show({
                title: "Event successfully set",
                message: `Current Event: ${event.title}`,
                color: "green",
            });
        } else if (previousEventRef.current && !event) {
            notifications.show({
                title: "Event cleared",
                message: "No current event selected.",
                color: "blue",
            });
        }
        previousEventRef.current = event;
    }, [event]);

    return (
        <CurrentEventContext.Provider value={{ currentEvent, setCurrentEvent }}>
            {children}
        </CurrentEventContext.Provider>
    );
}

export function useCurrentEvent() {
    const context = useContext(CurrentEventContext);
    if (!context) {
        throw new Error(
            "useCurrentEvent must be used within a CurrentEventProvider"
        );
    }
    return context;
}
