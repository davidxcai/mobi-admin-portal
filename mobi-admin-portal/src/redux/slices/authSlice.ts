// For user authentication

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// defines the shape of an auth state
// :string enforces it to always be a string. if a number, typescript will give error
interface User {
  username: string | null;
  student_id: string;
  name: {
    first: string;
    last: string;
  };
  role: string;
}

interface AuthState {
  user: User | null; // state.auth.user is a object or null
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null, // no user logged in by default
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // action is the object that gets passed when dispatch(login()) is called
    // the paylod (data being sent) must be a string type here
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // store the logged in user
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null; // clear the logged in user
      state.isAuthenticated = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
