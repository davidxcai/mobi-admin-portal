import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface Event {
  eventId: string;
  eventName: string;
  location: string;
  time: {
    start: string;
    end: string;
  };
  attendance: number;
}

interface EventsState {
  data: Event[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  data: [],
  currentEvent: null,
  loading: false,
  error: null,
};

// Reducers
const EventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.data = action.payload;
    },
    clearEvents: (state) => {
      state.data = [];
    },
    setCurrentEvent: (state, action: PayloadAction<Event>) => {
      state.currentEvent = action.payload;
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
  },
});

export const eventsReducer = EventsSlice.reducer;
export const { setEvents, clearEvents, setCurrentEvent, clearCurrentEvent } =
  EventsSlice.actions;
