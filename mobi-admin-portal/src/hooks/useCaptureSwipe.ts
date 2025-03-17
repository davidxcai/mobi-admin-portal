import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBuffer,
  setCaptureComplete,
  setCaptureActive,
  clearCaptureActive,
  resetCapture,
} from "../redux/slices/cardswipeSlice";
import { addCheckIn } from "../redux/slices/checkinSlice";
import { RootState } from "../redux/store";
import axios from "axios";

export const useCaptureSwipe = () => {
  const dispatch = useDispatch();

  const currentEventId = useSelector(
    (state: RootState) => state.events.currentEvent?.eventId
  );
  const momocoins = useSelector(
    (state: RootState) => state.events.currentEvent?.momocoins
  );

  const captureComplete = useSelector(
    (state: RootState) => state.cardswipe.captureComplete
  );
  const buffer = useSelector((state: RootState) => state.cardswipe.buffer);
  const isActive = useSelector(
    (state: RootState) => state.cardswipe.captureActive
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCaptureActive = () => {
    dispatch(setCaptureActive());
  };

  const handleCaptureInactive = () => {
    dispatch(clearCaptureActive());
  };

  useEffect(() => {
    if (!isActive) return; // Only listen if capturing is active

    const handleCardSwipe = (event: KeyboardEvent) => {
      dispatch(updateBuffer(event.key));

      // Reset timeout to detect when typing stops
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        dispatch(setCaptureComplete());
      }, 500); // 500ms delay
    };

    window.addEventListener("keydown", handleCardSwipe);

    return () => {
      window.removeEventListener("keydown", handleCardSwipe);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [dispatch, isActive]); // Depend on `isActive` to start/stop listening

  useEffect(() => {
    if (captureComplete) {
      console.log(`Captured: ${buffer}`);
      const API_URL = currentEventId
        ? `/api/event/checkin/${currentEventId}`
        : "";
      console.log("currentEventId", currentEventId);
      const sendCaptureData = async () => {
        try {
          const response = await axios.post(`http://localhost:3000${API_URL}`, {
            cardSwipeData: buffer,
            momocoins,
          });
          // add checkin to redux store
          dispatch(addCheckIn(response.data.checkin));
          console.log("API Response:", response.data);
        } catch (error) {
          console.error("Error sending capture data:", error);
        }
      };
      sendCaptureData();
      dispatch(resetCapture());
    }
  }, [captureComplete, buffer, dispatch]);
  return { handleCaptureActive, handleCaptureInactive };
};
