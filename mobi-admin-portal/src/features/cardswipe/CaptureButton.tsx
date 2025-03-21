import { useState } from "react";
import { useCardSwipe } from "./useCardSwipe";
import { useEventListener } from "@mantine/hooks";
import { Button } from "@mantine/core";

function CaptureButton() {
  const [isCapturing, setIsCapturing] = useState(false);
  const { handleCardSwipe } = useCardSwipe();

  const listenerRef = useEventListener("keydown", handleCardSwipe);

  return (
    <Button
      ref={isCapturing ? listenerRef : null}
      onClick={() => setIsCapturing(!isCapturing)}
      color={isCapturing ? "red" : "blue"}
    >
      {isCapturing ? "Stop Capturing" : "Capture"}
    </Button>
  );
}

export default CaptureButton;
