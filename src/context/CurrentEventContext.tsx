import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Event } from "../types/models";
import { notifications } from "@mantine/notifications";

interface CurrentEventContextProps {
  event: Event | null;
  setCurrentEvent: (event: Event | null) => void;
}

const CurrentEventContext = createContext<CurrentEventContextProps | undefined>(
  undefined
);

interface CurrentEventProviderProps {
  children: ReactNode;
}

export function CurrentEventProvider({ children }: CurrentEventProviderProps) {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const storedEvent = sessionStorage.getItem("currentEvent");
    if (storedEvent) {
      setEvent(JSON.parse(storedEvent));
    }
  }, []);

  const setCurrentEvent = (event: Event | null) => {
    if (event) {
      sessionStorage.setItem("currentEvent", JSON.stringify(event));
      notifications.show({
        title: "Event successfully set",
        message: `Current Event: ${event.title}`,
        color: "green",
      });
    } else {
      sessionStorage.removeItem("currentEvent");
      notifications.show({
        title: "Event cleared",
        message: "No current event selected.",
        color: "blue",
      });
    }
    setEvent(event);
  };

  return (
    <CurrentEventContext.Provider value={{ event, setCurrentEvent }}>
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
