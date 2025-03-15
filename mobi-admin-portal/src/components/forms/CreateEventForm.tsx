import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import useApi from "../../hooks/useApi";

function CreateEventForm() {
  const [formData, setFormData] = useState({
    event_name: "",
    location: "",
    momocoins: 0,
    start_time: new Date().toISOString().slice(0, 16), // Default to current time
    end_time: new Date().toISOString().slice(0, 16),
  });

  const {
    sendRequest: createEvent,
    loading,
    error,
  } = useApi(
    "createEvent",
    "http://localhost:3000/admin/dashboard/event/create",
    "POST"
  );

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
      console.log(response.data.event.event_id);
      alert(`Event created! Event ID: ${response.data.event.event_id}`);
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
          name="event_name" // FIXED
          value={formData.event_name}
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
          name="start_time" // FIXED
          value={formData.start_time}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formEventDateEnd">
        <Form.Label>End Date & Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="end_time" // FIXED
          value={formData.end_time}
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
