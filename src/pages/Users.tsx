import { Tabs } from "@mantine/core";
import { EventsTable } from "../features/events/EventsTable";
import { RefreshButton } from "../components/buttons";
import { CreateButton } from "../components/buttons";
import { CreateUserForm } from "../features/users";

export function Users() {
  const createUser = () => {
    console.log("User created");
  };
  const refreshUsers = () => {
    console.log("Refresh users");
  };
  return (
    <div className="flex flex-col h-full gap-4">
      <strong className="text-3xl">Users</strong>
      <Tabs defaultValue="events">
        <Tabs.List className="mb-4">
          <Tabs.Tab value="events">Current Users</Tabs.Tab>
          <Tabs.Tab value="checkins">Pending</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="events">
          <div className="flex justify-between items-center">
            <strong className="text-2xl">Spring 2025</strong>
            <div className="flex gap-4">
              <CreateButton
                title="Create New User"
                form={<CreateUserForm />}
                onConfirm={createUser}
              />
              <RefreshButton action={refreshUsers} />
            </div>
          </div>
          <EventsTable />
        </Tabs.Panel>
        <Tabs.Panel value="checkins">
          <EventsTable />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
