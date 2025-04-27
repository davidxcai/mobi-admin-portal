import { Card, Tabs, TextInput, Text, Title } from "@mantine/core";
import { RefreshButton } from "../components/buttons";
import { UsersTable, PendingUsersTable } from "../features/users/";
import { useGetAllProfiles } from "../hooks/useProfiles";
import { IconSearch } from "@tabler/icons-react";

export function Users() {
    const { refetch } = useGetAllProfiles();
    return (
        <div className="flex flex-col h-full gap-4">
            <Title order={1}>Users</Title>
            <Text c="dimmed" size="sm">
                Manage and view all MOBI organization members.
            </Text>
            <Tabs defaultValue="users">
                <Tabs.List className="mb-4">
                    <Tabs.Tab value="users">Current Users</Tabs.Tab>
                    <Tabs.Tab value="pending">Pending</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="users">
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <strong>2 Members</strong>

                            <RefreshButton action={refetch} />
                        </div>
                        <TextInput
                            leftSection={<IconSearch size={16} />}
                            placeholder="Search members..."
                            my="md"
                        />
                        <UsersTable />
                    </Card>
                </Tabs.Panel>
                <Tabs.Panel value="pending">
                    <Card>
                        <PendingUsersTable />
                    </Card>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}
