import { useCaptureSwipe } from "../hooks/useCaptureSwipe";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Event } from "../redux/types";
import { useState } from "react";
import { setCurrentEvent } from "../redux/slices/eventsSlice";
// import { useState } from "react";

function CardSwipe() {
  const dispatch = useDispatch();
  const { handleCaptureActive, handleCaptureInactive } = useCaptureSwipe();
  const [eventId, setEventId] = useState("");
  const isActive = useSelector((state: any) => state.cardswipe.captureActive);
  const CurrentEvent = useSelector((state: any) => state.events.currentEvent);
  const handleSetEvent = () => {
    const event = useSelector((state: any) => state.events);
    const foundEvent = event.find((event: Event) => event.eventId === eventId);
    if (foundEvent) {
      alert("Event found");
      dispatch(setCurrentEvent(foundEvent));
    } else {
      alert("Event not found");
    }
  };

  return (
    <div>
      <h1>CardSwipe</h1>
      <div className="d-flex flex-row ">
        <Form className="flex-grow-1">
          <Form.Group className="mb-3" controlId="eventId">
            <Form.Label>Current Event</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Event ID"
              onChange={(e) => setEventId(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button onClick={handleSetEvent} variant="primary">
          Set Event
        </Button>
        <div className="flex-grow-1">
          <h3>Current Event</h3>
          <p>{CurrentEvent?.eventName}</p>
          <p>{CurrentEvent?.location}</p>
          <p>{CurrentEvent?.time.start}</p>
          <p>{CurrentEvent?.time.end}</p>
          <p>{CurrentEvent?.attendance}</p>
        </div>
      </div>

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
