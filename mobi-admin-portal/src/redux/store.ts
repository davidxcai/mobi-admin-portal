// Manages global state, a centralized store that holds all my global states

// State -> the data it manages
// Reducers -> function that change the state
// Actions -> functions that call the reducers

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // state.auth.user, state.auth is right here
    // add more slices here later
  },
});

// Types for state and dispatch (for typescript users)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
