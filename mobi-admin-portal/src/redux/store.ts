// Manages global state, a centralized store that holds all my global states

// State -> the data it manages
// Reducers -> function that change the state
// Actions -> functions that call the reducers

import { useDispatch } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { uiReducer } from "./slices/uiSlice";
import { eventsReducer } from "./slices/eventsSlice";
import { checkinReducer } from "./slices/checkinSlice";
import { cardswipeReducer } from "./slices/cardswipeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // state.auth.user, state.auth is right here
    ui: uiReducer, // state.ui.darkMode
    events: eventsReducer, // state.events.events
    checkin: checkinReducer, // state.checkin.checkin
    cardswipe: cardswipeReducer, // state.cardswipe.buffer
  },
});

// Types for state and dispatch (for typescript users)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// For createAsyncThunk (api calls, typescript needs a typed dispatch for this specifically)
// Tells typescript that dispatch can handle async thunks
export const useAppDispatch = () => useDispatch<AppDispatch>();
