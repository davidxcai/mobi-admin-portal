import { Tabs } from "@mantine/core";
import { RefreshButton } from "../components/buttons";
import { ModalFormButton } from "../components/buttons";
import { CreateUserForm } from "../features/users";
import { UsersTable, PendingUsersTable } from "../features/users/";
import { useGetAllProfiles } from "../hooks/useProfiles";

export function Users() {
  const { refetch } = useGetAllProfiles();
  return (
    <div className="flex flex-col h-full gap-4">
      <strong className="text-3xl">Users</strong>
      <Tabs defaultValue="users">
        <Tabs.List className="mb-4">
          <Tabs.Tab value="users">Current Users</Tabs.Tab>
          <Tabs.Tab value="pending">Pending</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="users">
          <div className="flex justify-between items-center">
            <strong className="text-2xl">Spring 2025</strong>
            <div className="flex gap-4">
              <ModalFormButton
                title="Create New User"
                form={<CreateUserForm />}
              />
              <RefreshButton action={refetch} />
            </div>
          </div>
          <UsersTable />
        </Tabs.Panel>
        <Tabs.Panel value="pending">
          <PendingUsersTable />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
