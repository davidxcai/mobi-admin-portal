import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import DynamicTable from "../components/DynamicTable";
import CreateEventForm from "../components/forms/CreateEventForm";
import { useDispatch } from "react-redux";
import useApi from "../hooks/useApi";
import { setEvents } from "../redux/slices/eventsSlice";
import Button from "react-bootstrap/Button";

function Events() {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.data);
  const { loading, error } = useApi(
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
        <Button variant="primary">Refresh Events</Button>
      </div>
      {loading ? <p>Loading events...</p> : <DynamicTable data={events} />}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Events;

// import { useDispatch } from "react-redux";
// import { setData } from "../redux/eventsSlice";

// const UpdateEventDataButton = () => {
//     const dispatch = useDispatch();

//     const updateData = () => {
//         dispatch(setData([{ id: 1, name: "Updated Event" }])); // Manually set data
//     };

//     return <button onClick={updateData}>Update Events</button>;
// };
