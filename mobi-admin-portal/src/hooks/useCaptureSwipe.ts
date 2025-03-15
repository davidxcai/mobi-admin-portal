import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBuffer,
  setCaptureComplete,
  setCaptureActive,
  clearCaptureActive,
  resetCapture,
} from "../redux/slices/cardswipeSlice";
import { RootState } from "../redux/store";

export const useCaptureSwipe = () => {
  const dispatch = useDispatch();
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

      dispatch(resetCapture());
    }
  }, [captureComplete, buffer, dispatch]);
  return { handleCaptureActive, handleCaptureInactive };
};
