import { Table } from "@mantine/core";
import { useUserProfiles } from "./UsersProvider";
import type { Profile } from "../../types/models";
import { EditUserButton } from "./EditUserButton";

function checkIsAdmin(user: Profile) {
  return user.is_admin;
}

export function AdminsTable() {
  const admins = useUserProfiles().filter(checkIsAdmin);

  if (!admins) {
    return <div>No admins found</div>;
  }

  const rows = admins.map((admin) => (
    <Table.Tr key={admin.id} className="cursor-pointer">
      <Table.Td>
        {admin.first_name} {admin.last_name}
      </Table.Td>
      <Table.Td>{admin.role}</Table.Td>
      <Table.Td>{admin.created_at.toString()}</Table.Td>
      <Table.Td>
        <EditUserButton user={admin} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer type="native" minWidth={500}>
      <Table highlightOnHover verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Member Since</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
