// UI settings such as dark mode

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react"; // imports react node for flexible modal content

interface UiState {
  darkMode: boolean;
  currentPage: string;
  modal: {
    isOpen: boolean;
    title?: string;
    content?: ReactNode;
    confirmText?: string;
    confirmAction?: () => void;
  };
}

const initialState: UiState = {
  darkMode: false,
  currentPage: "dashboard",
  modal: {
    isOpen: false,
  },
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
    openModal: (
      state,
      action: PayloadAction<{
        title: string;
        content: ReactNode;
        confirmText?: string;
        confirmAction?: () => void;
      }>
    ) => {
      state.modal = {
        isOpen: true,
        title: action.payload.title,
        content: action.payload.content,
        confirmText: action.payload.confirmText,
        confirmAction: action.payload.confirmAction,
      };
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
    },
  },
});

export const uiReducer = uiSlice.reducer;
export const { toggleDarkMode, setCurrentPage, openModal, closeModal } =
  uiSlice.actions;
