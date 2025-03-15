// UI settings such as dark mode

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  darkMode: boolean;
  currentPage: string;
  isModalOpen: boolean;
}

const initialState: UiState = {
  darkMode: false,
  currentPage: "login",
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const uiReducer = uiSlice.reducer;
export const { toggleDarkMode, setCurrentPage, openModal, closeModal } =
  uiSlice.actions;
