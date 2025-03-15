import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { eventsData } from "../../development/data";

const SERVER_ONLINE = false; // Set to true to use the real API

// Async Thunk api calls
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  if (SERVER_ONLINE) {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/event/get/all"
      );

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
  return new Promise<Event[]>((resolve) => {
    setTimeout(() => {
      resolve(eventsData); // Simulate API response with dev data
    }, 1500); // Simulate 1.5s delay
  });
});

export const createEvent = createAsyncThunk("events/createEvent", async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/admin/event/create"
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
});

// Types
export interface Event {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const eventsReducer = EventsSlice.reducer;
export const { setEvents, clearEvents, setCurrentEvent, clearCurrentEvent } =
  EventsSlice.actions;
