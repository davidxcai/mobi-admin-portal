import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function CreateEventForm() {
  // const { loading, success, error } = useSelector((state: RootState) => state.events);
  return (
    <Form>
      <Form.Group controlId="formEventName">
        <Form.Label>Event Name</Form.Label>
        <Form.Control type="text" placeholder="Enter event name" />
      </Form.Group>
      <Form.Group controlId="formEventLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder="Enter location" />
      </Form.Group>
      <Form.Group controlId="formEventDate">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>
      <Form.Group controlId="formEventAttendance">
        <Form.Label>Attendance</Form.Label>
        <Form.Control type="number" />
      </Form.Group>
    </Form>
  );
}

export default CreateEventForm;
