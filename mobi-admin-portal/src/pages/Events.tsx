import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import DynamicTable from "../components/DynamicTable";
import CreateEventForm from "../components/forms/CreateEventForm";
import { useDispatch } from "react-redux";
import useApi from "../hooks/useApi";
import { setEvents } from "../redux/slices/eventsSlice";

function Events() {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.data);
  const { loading, error } = useApi("events", "/api/events", "GET", (data) => {
    dispatch(setEvents(data));
  });

  return (
    <div className="">
      <h1>Events</h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            <CreateEventForm />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
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
