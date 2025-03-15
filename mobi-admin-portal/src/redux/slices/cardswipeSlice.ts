import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardSwipe {
  buffer: string;
  captureComplete: boolean;
  captureActive: boolean;
  captureError: boolean;
}

const initialState: CardSwipe = {
  buffer: "",
  captureComplete: false,
  captureActive: false,
  captureError: false,
};

const cardswipeSlice = createSlice({
  name: "cardswipe",
  initialState,
  reducers: {
    updateBuffer: (state, action: PayloadAction<string>) => {
      state.buffer += action.payload;
    },
    setCaptureComplete: (state) => {
      state.captureComplete = true;
    },
    setCaptureActive: (state) => {
      state.captureActive = true;
    },
    setCaptureError: (state) => {
      state.captureError = true;
    },
    resetCapture: (state) => {
      state.captureComplete = false;
      state.buffer = "";
    },
    clearCaptureActive: (state) => {
      state.captureActive = false;
    },
    clearCaptureError: (state) => {
      state.captureError = false;
    },
  },
});

export const cardswipeReducer = cardswipeSlice.reducer;
export const {
  updateBuffer,
  setCaptureComplete,
  setCaptureActive,
  setCaptureError,
  resetCapture,
  clearCaptureActive,
  clearCaptureError,
} = cardswipeSlice.actions;
