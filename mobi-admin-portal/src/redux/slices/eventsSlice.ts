import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  event_id: string;
  title: string;
  location: string;
  date: {
    start: string;
    end: string;
  };
  attendance: number;
}

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
};

const EventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    clearEvents: (state) => {
      state.events = [];
    },
  },
});

export const eventsReducer = EventsSlice.reducer;
export const { setEvents, clearEvents } = EventsSlice.actions;
