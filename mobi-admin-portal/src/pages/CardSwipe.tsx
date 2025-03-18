import { useCaptureSwipe } from "../hooks/useCaptureSwipe";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import useEvent from "../hooks/useEvents";
import useApi from "../hooks/useApi";
import useCheckins from "../hooks/useCheckins";
import CheckInTable from "../components/tables/CheckInTable";
import { formatDate } from "../utils/tableUtils";
import { InputGroup } from "react-bootstrap";
import { useEffect } from "react";

function CardSwipe() {
  // Local States
  const [eventId, setEventId] = useState("");
  const isValidEvent = eventId.length === 5 ? true : false;
  const [isCapturingActive, setIsCapturingActive] = useState(false);
  // if current time is greater than end time or less than start time, do not allow swipe
  console.log("isCapturingActive", isCapturingActive);

  // Redux Store
  const checkins = useSelector((state: any) => state.checkin?.data);
  // const isCapturingActive = useSelector((state: any) => state.cardswipe.captureActive);
  const CurrentEvent = useSelector((state: any) => state.events.currentEvent);

  // Custom Hooks
  const { handleCaptureActive, handleCaptureInactive } =
    useCaptureSwipe(setIsCapturingActive);
  const { handleSetCurrentEvent, handleClearCurrentEvent } = useEvent();
  const { handlePopulateCheckins } = useCheckins();
  const {
    sendRequest: getAllCheckins,
    loading,
    error,
  } = useApi(
    "checkins",
    `http://localhost:3000/api/checkin/getAll/${eventId}`,
    "GET",
    (data) => {
      handlePopulateCheckins(data.checkins);
    },
    checkins,
    { autoFetch: false }
  );

  // onClicks
  const handleSetEvent = () => {
    handleSetCurrentEvent(eventId);
    getAllCheckins();
  };

  const clearCurrentEvent = () => {
    handleClearCurrentEvent();
    handleCaptureInactive();
    setEventId("");
  };

  // Stop capturing when component unmounts
  useEffect(() => {
    handleCaptureInactive();
  }, []);

  return (
    <>
      <h1>CardSwipe</h1>
      <div className="d-flex flex-row gap-5">
        <div className="flex-grow-1">
          <Form.Label>Event ID</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Event ID"
              onChange={(e) => setEventId(e.target.value)}
              aria-label="eventId"
              aria-describedby="eventId"
              disabled={CurrentEvent ? true : false}
            />
            <Button
              onClick={() =>
                CurrentEvent ? clearCurrentEvent() : handleSetEvent()
              }
              variant={CurrentEvent ? "outline-info" : "outline-primary"}
              disabled={!CurrentEvent && !isValidEvent}
            >
              {CurrentEvent ? "Clear Event" : "Set Event"}
            </Button>
          </InputGroup>

          <div className="d-flex">
            <Button
              onClick={
                isCapturingActive ? handleCaptureInactive : handleCaptureActive
              }
              variant={isCapturingActive ? "danger" : "primary"}
              disabled={!CurrentEvent}
            >
              {isCapturingActive ? "Capturing..." : "Capture"}
            </Button>
            <div>
              {isCapturingActive && loading ? <p>Reading Swipe...</p> : null}
              {isCapturingActive && error ? <p>Error: {error}</p> : null}
            </div>
          </div>
        </div>

        <div className="flex-grow-1 row">
          {!CurrentEvent ? (
            <p>No current event set</p>
          ) : (
            <div className="col-auto">
              <p>Event Name</p>
              <p>Event ID</p>
              <p>Attendance</p>
              <p>Location</p>
              <p>Date-Time Start</p>
              <p>Date-Time End</p>
              <p>Momo Coins</p>
            </div>
          )}
          <div className="col flex-grow-1">
            <p>{CurrentEvent?.eventName}</p>
            <p>{CurrentEvent?.eventId}</p>
            <p>{CurrentEvent?.attendance}</p>
            <p>{CurrentEvent?.location}</p>
            <p>{formatDate(CurrentEvent?.time.start)}</p>
            <p>{formatDate(CurrentEvent?.time.end)}</p>
            <p>{CurrentEvent?.momocoins}</p>
          </div>
        </div>
      </div>

      {loading ? <p>Loading checkins...</p> : <CheckInTable />}
      {error && <p>Error: {error}</p>}
    </>
  );
}

export default CardSwipe;
