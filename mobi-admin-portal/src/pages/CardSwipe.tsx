import { useCaptureSwipe } from "../hooks/useCaptureSwipe";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function CardSwipe() {
  const { handleCaptureActive, handleCaptureInactive } = useCaptureSwipe();
  const isActive = useSelector((state: any) => state.cardswipe.captureActive);
  return (
    <div>
      <h1>CardSwipe</h1>
      <Button
        onClick={isActive ? handleCaptureInactive : handleCaptureActive}
        variant={isActive ? "danger" : "primary"}
      >
        {isActive ? "Capturing..." : "Capture"}
      </Button>
    </div>
  );
}

export default CardSwipe;
