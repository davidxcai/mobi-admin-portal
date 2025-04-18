import { Table, Button } from "@mantine/core";
import { CheckInButton } from "./CheckInButton";
import { IconEdit } from "@tabler/icons-react";

export function CurrentEvent() {
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
        </div>
      </div>
      <Table withRowBorders={false}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={160}>Event Name</Table.Th>
            <Table.Td>7.x migration</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>Location</Table.Th>
            <Table.Td>Open</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>Start Time</Table.Th>
            <Table.Td>5:00 PM</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>End Time</Table.Th>
            <Table.Td>7:00 PM</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>Attendance</Table.Th>
            <Table.Td>13</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  );
}
