import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import useApi from "../../hooks/useApi";

function CreateEventForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    momocoins: 0,
    duration: {
      start: "",
      end: "",
    },
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createEvent(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group controlId="formEventName">
        <Form.Label>Event Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
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
        <Form.Label>Date Start</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.duration.start}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formEventDateEnd">
        <Form.Label>Date End</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.duration.end}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formEventAttendance">
        <Form.Label>Momo Coins</Form.Label>
        <Form.Control
          type="number"
          name="attendance"
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
