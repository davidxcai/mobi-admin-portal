import { Card, Tabs, Text, Title } from "@mantine/core";
import { AdminsTable, CurrentUsersTable } from "../features/users/";
import { UsersProvider } from "../features/users/UsersProvider";
import { useProfileContext } from "../providers/ProfileProvider";

// TODO:
// create button to delete user in users table
// implement promote/demote admin hooks
// implement delete user hook
// update policies in supabase

export function Users() {
  const admin = useProfileContext();
  const isSuperAdmin = admin.role === "super_admin";
  return (
    <div className="flex flex-col h-full gap-4">
      <Title order={1}>Users</Title>
      <Text c="dimmed" size="sm">
        Manage and view all MOBI organization members.
      </Text>
      <UsersProvider>
        <Tabs defaultValue="users">
          <Tabs.List className="mb-4">
            <Tabs.Tab value="users">Current Users</Tabs.Tab>
            {isSuperAdmin && <Tabs.Tab value="admins">Admins</Tabs.Tab>}
          </Tabs.List>
          <Tabs.Panel value="users">
            <Card>
              <CurrentUsersTable />
            </Card>
          </Tabs.Panel>
          {isSuperAdmin && (
            <Tabs.Panel value="admins">
              <Card>
                <AdminsTable />
              </Card>
            </Tabs.Panel>
          )}
        </Tabs>
      </UsersProvider>
    </div>
  );
}
