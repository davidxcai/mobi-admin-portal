import { Table, Button } from "@mantine/core";
import { useGetEventCheckIns } from "../../hooks/";

export function CheckInsTable() {
  const { data: checkins, isPending, isError, error } = useGetEventCheckIns();

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (!checkins) {
    return <div>No current event set</div>;
  }

  if (checkins.length === 0) {
    return <div>No check-ins found</div>;
  }

  const rows = checkins.map((checkin) => (
    <Table.Tr key={checkin.id} className="cursor-pointer">
      <Table.Td>
        {checkin.profiles.first_name} {checkin.profiles.last_name}
      </Table.Td>
      <Table.Td>{checkin.created_at.toString()}</Table.Td>
      <Table.Td>{checkin.momocoins}</Table.Td>
      <Table.Td>
        {checkin.checked_in_by.first_name} {checkin.checked_in_by.last_name}
      </Table.Td>
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
            <Table.Th>Name</Table.Th>
            <Table.Th>Check-In Time</Table.Th>
            <Table.Th>Momocoins</Table.Th>
            <Table.Th>Checked-In By</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
