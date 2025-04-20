import { Table, Button } from "@mantine/core";
import { CheckInButton } from "./CheckInButton";
import { IconEdit } from "@tabler/icons-react";
import { useCurrentEvent } from "../../context/CurrentEventContext";

export function CurrentEvent() {
  const { event, setCurrentEvent } = useCurrentEvent();
  if (!event) {
    return <h1>No Current Event selected.</h1>;
  }
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-center">
        <strong className="text-2xl">Current Event</strong>
        <div className="flex gap-4">
          <CheckInButton />
          <Button
            size="compact-sm"
            variant="outline"
            leftSection={<IconEdit size={14} />}
          >
            Update
          </Button>
          <Button
            size="compact-sm"
            variant="outline"
            color="red"
            onClick={() => setCurrentEvent(null)}
          >
            Remove
          </Button>
        </div>
      </div>
      <Table withRowBorders={false}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={160}>Event Name</Table.Th>
            <Table.Td>{event.title}</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>Location</Table.Th>
            <Table.Td>{event.location}</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>Start Time</Table.Th>
            <Table.Td>{event.starts_at}</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>End Time</Table.Th>
            <Table.Td>{event.ends_at}</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>Attendance</Table.Th>
            <Table.Td>{event.attendance}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  );
}
