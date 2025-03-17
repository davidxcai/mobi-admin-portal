import { useDispatch, useSelector } from "react-redux";
import { useMemo, useCallback } from "react";
import { Event } from "../redux/types";

import {
  setEvents,
  clearEvents,
  setCurrentEvent,
  clearCurrentEvent,
} from "../redux/slices/eventsSlice";

const useEvents = () => {
  const dispatch = useDispatch();

  const event = useSelector((state: any) => state.events);

  const handleSetEvents = useCallback(
    (events: Event[]) => {
      dispatch(setEvents(events));
    },
    [dispatch]
  );

  const handleClearEvents = useCallback(() => {
    dispatch(clearEvents());
  }, [dispatch]);

  const handleSetCurrentEvent = useCallback(
    (eventId: String) => {
      const foundEvent = event.find(
        (event: Event) => event.eventId === eventId
      );
      dispatch(setCurrentEvent(foundEvent));
    },
    [dispatch]
  );

  const handleClearCurrentEvent = useCallback(() => {
    dispatch(clearCurrentEvent());
  }, [dispatch]);

  return useMemo(
    () => ({
      handleSetEvents,
      handleClearEvents,
      handleSetCurrentEvent,
      handleClearCurrentEvent,
    }),
    [
      handleSetEvents,
      handleClearEvents,
      handleSetCurrentEvent,
      handleClearCurrentEvent,
    ]
  );
};

export default useEvents;
