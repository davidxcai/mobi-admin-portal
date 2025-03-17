import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckIn {
  eventId: string;
  studentId: string;
  username: string | null;
  name: {
    first: string;
    last: string;
  };
  momocoins: number;
  time: string;
}

interface checkinState {
  data: CheckIn[];
}

const initialState: checkinState = {
  data: [],
};

const checkinSlice = createSlice({
  name: "checkins",
  initialState,
  reducers: {
    setCheckIns: (state, action: PayloadAction<CheckIn[]>) => {
      state.data = action.payload;
    },
    addCheckIn: (state, action: PayloadAction<CheckIn>) => {
      state.data.push(action.payload);
    },
    clearCheckIns: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase("events/clearCurrentEvent", (state) => {
      state.data = [];
    });
  },
});

export const checkinReducer = checkinSlice.reducer;
export const { setCheckIns, addCheckIn, clearCheckIns } = checkinSlice.actions;
