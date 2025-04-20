import { Table, Badge } from "@mantine/core";
import { eventsData } from "../../development/data";
import { useCurrentEvent } from "../../context/CurrentEventContext";

export function EventsTable() {
  const { event: currentEvent, setCurrentEvent } = useCurrentEvent();

  const isCurrentEvent = (event: any) => {
    return (
      currentEvent?.id === event.id && (
        <Badge size="sm" color="blue">
          Current Event
        </Badge>
      )
    );
  };

  const rows = eventsData.map((event) => (
    <Table.Tr
      key={event.title}
      className="cursor-pointer"
      onClick={() => setCurrentEvent(event)}
    >
      <Table.Td>
        {event.title} {isCurrentEvent(event)}
      </Table.Td>
      <Table.Td>{event.starts_at}</Table.Td>
      <Table.Td>{event.ends_at}</Table.Td>
      <Table.Td>{event.location}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer type="native" minWidth={500}>
      <Table highlightOnHover highlightOnHoverColor="blue" verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Start</Table.Th>
            <Table.Th>End</Table.Th>
            <Table.Th>Location</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
