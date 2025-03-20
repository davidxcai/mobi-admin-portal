import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import CreateEventForm from "../components/forms/CreateEventForm";
import { useDispatch } from "react-redux";
import useApi from "../hooks/useApi";
import { setEvents, clearEvents } from "../redux/slices/eventsSlice";
import Button from "react-bootstrap/Button";
import EventTable from "../components/tables/EventTable";
// import { Alert } from "react-bootstrap";

function Events() {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.data);
  const {
    sendRequest: getAllEvents,
    loading,
    error,
  } = useApi(
    "events",
    "http://localhost:3000/api/event/getAll",
    "GET",
    (data) => {
      if (data.events.length === 0) {
        console.log("No events found");
      } else {
        dispatch(setEvents(data.events));
      }
    },
    events
  );

  return (
    <div className="d-flex flex-column gap-3">
      <h1>Events</h1>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Create New Event</Accordion.Header>
          <Accordion.Body>
            <CreateEventForm />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={() => getAllEvents()}>
          Refresh Events
        </Button>
      </div>
      {/* <Alert variant="success">New Event Created! Event ID: </Alert> */}
      {loading ? <p>Loading events...</p> : <EventTable />}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Events;
