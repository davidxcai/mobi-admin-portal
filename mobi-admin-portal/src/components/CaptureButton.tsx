import useEvent from "../hooks/useEvents";
import useApi from "../hooks/useApi";
import useCheckins from "../hooks/useCheckins";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCaptureSwipe } from "../hooks/useCaptureSwipe";
import { useState } from "react";

const CaptureButton = React.memo(() => {
  const [buffer, setBuffer] = useState("");
  const [captureComplete, setCaptureComplete] = useState(false);
  const { handleCaptureActive, handleCaptureInactive } = useCaptureSwipe();
  const isActive = useSelector(
    (state: RootState) => state.cardswipe.captureActive
  );
  const currentEvent = useSelector((state: any) => state.events.currentEvent);

  return (
    <Button
      onClick={isActive ? handleCaptureInactive : handleCaptureActive}
      variant={isActive ? "danger" : "primary"}
      disabled={!currentEvent}
    >
      {isActive ? "Capturing..." : "Capture"}
    </Button>
  );
});

export default CaptureButton;
