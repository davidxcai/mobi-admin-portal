import { useDispatch, useSelector } from "react-redux";
import { useMemo, useCallback } from "react";
import { Event } from "../redux/types";

import {
  setEvents,
  addEvent,
  clearEvents,
  setCurrentEvent,
  clearCurrentEvent,
} from "../redux/slices/eventsSlice";
import { clearCheckIns } from "../redux/slices/checkinSlice";

const useEvents = () => {
  const dispatch = useDispatch();

  const events = useSelector((state: any) => state.events.data);

  const handleSetEvents = useCallback(
    (events: Event[]) => {
      dispatch(setEvents(events));
    },
    [dispatch]
  );

  const handleAddEvent = useCallback(
    (event: Event) => {
      dispatch(addEvent(event));
    },
    [dispatch]
  );

  const handleClearEvents = useCallback(() => {
    dispatch(clearEvents());
  }, [dispatch]);

  const handleSetCurrentEvent = useCallback(
    (eventId: String) => {
      const foundEvent = events.find(
        (event: Event) => event.eventId === eventId
      );
      if (!foundEvent) {
        alert("Event not found");
        return;
      }
      dispatch(setCurrentEvent(foundEvent));
    },
    [dispatch]
  );

  const handleClearCurrentEvent = useCallback(() => {
    dispatch(clearCurrentEvent());
    dispatch(clearCheckIns());
  }, [dispatch]);

  return useMemo(
    () => ({
      handleSetEvents,
      handleAddEvent,
      handleClearEvents,
      handleSetCurrentEvent,
      handleClearCurrentEvent,
    }),
    [
      handleSetEvents,
      handleAddEvent,
      handleClearEvents,
      handleSetCurrentEvent,
      handleClearCurrentEvent,
    ]
  );
};

export default useEvents;
