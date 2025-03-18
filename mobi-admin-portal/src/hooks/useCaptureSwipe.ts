import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCheckIn } from "../redux/slices/checkinSlice";
import { RootState } from "../redux/store";
import axios from "axios";

export const useCaptureSwipe = (setIsActive: (active: boolean) => void) => {
  const dispatch = useDispatch();

  const bufferRef = useRef("");
  const [captureComplete, setCaptureComplete] = useState(false);
  // const [isActive, setIsActive] = useState(false);

  // Redux Store
  const currentEventId = useSelector(
    (state: RootState) => state.events.currentEvent?.eventId
  );
  const momocoins = useSelector(
    (state: RootState) => state.events.currentEvent?.momocoins
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Event Handlers

  const handleCaptureActive = () => {
    setIsActive(true);
    bufferRef.current = "";
  };

  const handleCaptureInactive = () => {
    setIsActive(false);
    bufferRef.current = "";
    setCaptureComplete(false);
  };

  // Event Listeners

  useEffect(() => {
    if (!setIsActive) return; // Only listen if capturing is active

    const handleCardSwipe = (event: KeyboardEvent) => {
      // append keystroke to buffer
      bufferRef.current += event.key;

      // Reset timeout to detect when typing stops
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCaptureComplete(true);
      }, 500); // 500ms delay before it stops listening
    };

    window.addEventListener("keydown", handleCardSwipe);

    return () => {
      window.removeEventListener("keydown", handleCardSwipe);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [setIsActive]); // Depend on `isActive` to start/stop listening

  useEffect(() => {
    if (captureComplete) {
      console.log(`Captured: ${bufferRef.current}`);
      const API_URL = currentEventId
        ? `/api/event/checkin/${currentEventId}`
        : "";
      console.log("currentEventId", currentEventId);
      const sendCaptureData = async () => {
        try {
          const response = await axios.post(`http://localhost:3000${API_URL}`, {
            cardSwipeData: bufferRef.current,
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
      bufferRef.current = "";
      setCaptureComplete(false);
    }
  }, [captureComplete, bufferRef, dispatch]);
  return { handleCaptureActive, handleCaptureInactive };
};
