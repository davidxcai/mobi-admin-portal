import { Table, Badge, Button } from "@mantine/core";
import { useCurrentEvent } from "../../context/CurrentEventContext";
import { useGetAllEvents } from "../../hooks/useEvents";
import { Event } from "../../types/models";

export function EventsTable() {
  const { data: events, isPending, isError, error } = useGetAllEvents();
  const { event: currentEvent, setCurrentEvent } = useCurrentEvent();

  const isCurrentEvent = (event: Event) => {
    return (
      currentEvent?.id === event.id && (
        <Badge size="sm" color="blue">
          Current Event
        </Badge>
      )
    );
  };

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (!events) {
    return <div>No events found</div>;
  }

  const rows = events.map((event) => (
    <Table.Tr
      key={event.title}
      className="cursor-pointer"
      onClick={() => setCurrentEvent(event)}
    >
      <Table.Td>
        {event.title} {isCurrentEvent(event)}
      </Table.Td>
      <Table.Td>{event.attendance}</Table.Td>
      <Table.Td>{event.momocoins}</Table.Td>
      <Table.Td>{event?.starts_at.toString()}</Table.Td>
      <Table.Td>{event?.ends_at.toString()}</Table.Td>
      <Table.Td>{event.location}</Table.Td>
      <Table.Td>
        <Button size="compact-xs" color="blue">
          Edit
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer type="native" minWidth={500}>
      <Table highlightOnHover highlightOnHoverColor="blue" verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Attendance</Table.Th>
            <Table.Th>Momocoins</Table.Th>
            <Table.Th>Start</Table.Th>
            <Table.Th>End</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
