import { Table } from "@mantine/core";
import { useUserProfiles } from "./UsersProvider";
import { useProfileContext } from "../../providers/ProfileProvider";
import { EditUserButton } from "./EditUserButton";
import { SetAdminButton } from "./SetAdminButton";
import { useGetAdmins } from "../../hooks/useAdmin";

export function UsersTable() {
  const { data: admins } = useGetAdmins();
  const admin = useProfileContext();
  const users = useUserProfiles();
  const isSuperAdmin = admin.role === "super_admin";

  console.log("admins:", admins);

  if (!users) {
    return <div>No users found</div>;
  }

  const rows = users.map((user) => (
    <Table.Tr key={user.id} className="cursor-pointer">
      <Table.Td>
        {user.first_name} {user.last_name}
      </Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.momocoins}</Table.Td>
      <Table.Td>{user.created_at.toString()}</Table.Td>
      <Table.Td>{user.account_status}</Table.Td>
      <Table.Td>
        <EditUserButton user={user} />
        {isSuperAdmin && <SetAdminButton user={user} />}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer type="native" minWidth={500}>
      <Table highlightOnHover verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Momocoins</Table.Th>
            <Table.Th>Member Since</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
