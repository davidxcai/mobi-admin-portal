import { Table } from "@mantine/core";
import { eventsData } from "../../development/data";

export function EventsTable() {
  const rows = eventsData.map((event) => (
    <Table.Tr key={event.title} className="cursor-pointer">
      <Table.Td>{event.title}</Table.Td>
      <Table.Td>{event.date}</Table.Td>
      <Table.Td>{event.start}</Table.Td>
      <Table.Td>{event.end}</Table.Td>
      <Table.Td>{event.location}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer type="native" minWidth={500}>
      <Table highlightOnHover highlightOnHoverColor="blue" verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Date</Table.Th>
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
