import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { RootState } from "../redux/store";

import { setCheckIns, clearCheckIns } from "../redux/slices/checkinSlice";

import { checkins } from "../development/data";

const useCheckins = () => {
  const dispatch = useDispatch();

  // States
  const currentEvent = useSelector(
    (state: RootState) => state.events.currentEvent
  );

  // Actions
  const handlePopulateCheckins = useCallback(() => {
    dispatch(setCheckIns(checkins));
  }, [dispatch]);

  const handleClearCheckins = useCallback(() => {
    dispatch(clearCheckIns());
  }, [dispatch]);

  return useMemo(
    () => ({
      handlePopulateCheckins,
      handleClearCheckins,
    }),
    [handlePopulateCheckins, handleClearCheckins]
  );
};

export default useCheckins;
