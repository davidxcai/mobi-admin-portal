import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import useUi from "../hooks/useUi";
import DynamicTable from "../components/DynamicTable";
import DynamicModal from "../components/DynamicModal";
import CreateEventForm from "../components/forms/CreateEventForm";

function Events() {
  const { openModalHandler } = useUi();
  const events = useSelector((state: RootState) => state.events.data);

  const handleCreateEvent = () => {
    console.log("Create Event");
  };

  return (
    <div className="">
      <h1>Events</h1>
      <Button variant="primary" onClick={() => openModalHandler()}>
        Create Event
      </Button>
      <DynamicTable data={events} />
      <DynamicModal
        title="Create Event"
        content={<CreateEventForm />}
        confirmText="Create"
        confirmAction={handleCreateEvent}
      />
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
