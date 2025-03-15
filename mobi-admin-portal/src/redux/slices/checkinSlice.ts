import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckIn {
  event_id: string;
  student_id: string;
  username: string | null;
  name: {
    first: string;
    last: string;
  };
  momocoins: number;
  time: string;
}

interface checkinState {
  checkIns: CheckIn[];
}

const initialState: checkinState = {
  checkIns: [],
};

const checkinSlice = createSlice({
  name: "checkins",
  initialState,
  reducers: {
    setCheckIns: (state, action: PayloadAction<CheckIn[]>) => {
      state.checkIns = action.payload;
    },
    clearCheckIns: (state) => {
      state.checkIns = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase("events/clearCurrentEvent", (state) => {
      state.checkIns = [];
    });
  },
});

export const checkinReducer = checkinSlice.reducer;
export const { setCheckIns, clearCheckIns } = checkinSlice.actions;
