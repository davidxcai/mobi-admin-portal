import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  event_id: string;
  title: string;
  location: string;
  date: {
    start: string;
    end: string;
  };
  attendance: number;
}

interface CheckIn {
  student_id: string;
  username: string | null;
  name: {
    first: string;
    last: string;
  };
  momocoins: number;
  time: string;
}

interface CurrentEventState {
  currentEvent: Event | null;
  checkIns: CheckIn[];
}

const initialState: CurrentEventState = {
  currentEvent: null,
  checkIns: [],
};

const currentEventSlice = createSlice({
  name: "currentEvent",
  initialState,
  reducers: {
    setCurrentEvent: (state, action: PayloadAction<Event>) => {
      state.currentEvent = action.payload;
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
    setCheckIns: (state, action: PayloadAction<CheckIn[]>) => {
      state.checkIns = action.payload;
    },
    clearCheckIns: (state) => {
      state.checkIns = [];
    },
  },
});

export const currentEventReducer = currentEventSlice.reducer;
export const {
  setCurrentEvent,
  clearCurrentEvent,
  setCheckIns,
  clearCheckIns,
} = currentEventSlice.actions;
