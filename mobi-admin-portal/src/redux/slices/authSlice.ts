// For user authentication

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// defines the shape of an auth state
// :string enforces it to always be a string. if a number, typescript will give error
interface AuthState {
  user: string | null; // state.auth.user is a string or null
}

const initialState: AuthState = {
  user: null, // no user logged in by default
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // action is the object that gets passed when dispatch(login()) is called
    // the paylod (data being sent) must be a string type here
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload; // store the logged in user
    },
    logout: (state) => {
      state.user = null; // clear the logged in user
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
