import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import useApi from "../../hooks/useApi";
import useEvent from "../../hooks/useEvents";

function CreateEventForm() {
  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    momocoins: 0,
    timeStart: new Date().toISOString().slice(0, 16), // Default to current time
    timeEnd: new Date().toISOString().slice(0, 16),
  });

  const {
    sendRequest: createEvent,
    loading,
    error,
  } = useApi("createEvent", "http://localhost:3000/api/event/create", "POST");
  const { handleAddEvent } = useEvent();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createEvent(formData);
    if (response?.data) {
      handleAddEvent(response.data.event[0]);
      console.log(response?.data?.event[0].eventId);
      alert(`Event created! Event ID: ${response?.data?.event[0].eventId}`);
    } else {
      alert("Failed to create event");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group controlId="formEventName">
        <Form.Label>Event Name</Form.Label>
        <Form.Control
          type="text"
          name="eventName" // FIXED
          value={formData.eventName}
          onChange={handleInputChange}
          placeholder="Enter event name"
        />
      </Form.Group>

      <Form.Group controlId="formEventLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Enter location"
        />
      </Form.Group>

      <Form.Group controlId="formEventDateStart">
        <Form.Label>Start Date & Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="timeStart" // FIXED
          value={formData.timeStart}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formEventDateEnd">
        <Form.Label>End Date & Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="timeEnd" // FIXED
          value={formData.timeEnd}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formEventAttendance">
        <Form.Label>Momo Coins</Form.Label>
        <Form.Control
          type="number"
          name="momocoins"
          value={formData.momocoins}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Event"}
      </Button>
    </Form>
  );
}

export default CreateEventForm;
