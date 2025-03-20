import { useState, useRef } from "react";

function CaptureButton() {
  const [isCapturingActive, setIsCapturingActive] = useState(false);
  const buffer = useRef("");

  const handleCardSwipe = (event: KeyboardEvent) => {
    buffer.current += event.key;
  };

  return (
    <button
      onClick={() => setIsCapturingActive(!isCapturingActive)}
      className={`btn btn-${isCapturingActive ? "danger" : "success"}`}
    >
      {isCapturingActive ? "Stop Capturing" : "Start Capturing"}
    </button>
  );
}

export default CaptureButton;
