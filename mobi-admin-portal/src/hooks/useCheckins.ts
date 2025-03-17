import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect } from "react";
import { RootState } from "../redux/store";
import { CheckIn } from "../redux/types";
// import useApi from "./useApi";

import {
  setCheckIns,
  addCheckIn,
  clearCheckIns,
} from "../redux/slices/checkinSlice";

// import { checkins } from "../development/data";

const useCheckins = () => {
  const dispatch = useDispatch();

  // States
  const currentEvent = useSelector(
    (state: RootState) => state.events.currentEvent
  );
  const checkins = useSelector((state: RootState) => state.checkin?.data);

  const handleAddCheckIn = useCallback(
    (checkin: CheckIn) => {
      dispatch(addCheckIn(checkin));
    },
    [dispatch]
  );

  // Actions
  const handlePopulateCheckins = useCallback(
    (checkins: CheckIn[]) => {
      if (!checkins || checkins.length === 0) {
        return;
      }
      console.log("checkins", checkins);
      checkins.map((checkin) => {
        dispatch(addCheckIn(checkin));
      });
      // dispatch(setCheckIns(checkins));
    },
    [dispatch]
  );

  const handleClearCheckins = useCallback(() => {
    dispatch(clearCheckIns());
  }, [dispatch]);

  // Auto populate checkins if current event is set
  // useEffect(() => {
  //   if (currentEvent && currentEvent.eventId) {
  //     getAllCheckins(); // Calls the API to fetch check-ins automatically
  //   }
  // }, [currentEvent]);

  return useMemo(
    () => ({
      handlePopulateCheckins,
      handleAddCheckIn,
      handleClearCheckins,
    }),
    [handlePopulateCheckins, addCheckIn, handleClearCheckins]
  );
};

export default useCheckins;
