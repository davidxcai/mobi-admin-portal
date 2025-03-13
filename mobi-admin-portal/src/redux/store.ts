// Manages global state, a centralized store that holds all my global states

// State -> the data it manages
// Reducers -> function that change the state
// Actions -> functions that call the reducers

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { uiReducer } from "./slices/uiSlice";
import { eventsReducer } from "./slices/eventsSlice";
import { currentEventReducer } from "./slices/currentEventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // state.auth.user, state.auth is right here
    ui: uiReducer, // state.ui.darkMode
    events: eventsReducer, // state.events.events
    currentEvent: currentEventReducer, // state.currentEvent.currentEvent
  },
});

// Types for state and dispatch (for typescript users)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
