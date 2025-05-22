import { Card, Tabs, Text, Title } from "@mantine/core";
import { AdminsTable, CurrentUsersTable } from "../features/users/";
import { UsersProvider } from "../features/users/UsersProvider";
import { useProfileContext } from "../providers/ProfileProvider";

// TODO:
// implement search function for user table
// implement filter function for user table
// imoplement promote to super admin
// implement delete user button inside modal (requires confirmation)
// fix hover state for action buttons
// implment audit log for user actions (especially momocoin transactions)

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
