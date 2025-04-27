import { Table, Button } from "@mantine/core";
import { useGetAllPendingProfiles } from "../../hooks/useProfiles";

export function PendingUsersTable() {
    const {
        data: users,
        isPending,
        isError,
        error,
    } = useGetAllPendingProfiles();

    if (isPending) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    if (!users) {
        return <div>No users found</div>;
    }

    const rows = users.map((user) => (
        <Table.Tr key={user.id} className="cursor-pointer">
            <Table.Td>
                {user.first_name} {user.last_name}
            </Table.Td>
            <Table.Td>{user.role}</Table.Td>
            <Table.Td>{user.momocoins}</Table.Td>
            <Table.Td>{user.created_at.toString()}</Table.Td>
            <Table.Td>{user.account_status}</Table.Td>
            <Table.Td>
                <Button size="compact-xs" color="blue">
                    Edit
                </Button>
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
