import { Tabs, Divider, Stack } from "@mantine/core";
import { EventsTable, CurrentEvent, CreateEventForm } from "../features/events";
import { ModalFormButton, RefreshButton } from "../components/buttons";

export function Events() {
  const refreshEvents = () => {
    console.log("Refresh events");
    // replace with hook later
  };
  const refreshCheckins = () => {
    console.log("Refresh check-ins");
    // replace with hook later
  };
  return (
    <Stack h="100%" gap="md">
      <strong className="text-3xl">Events</strong>
      <Tabs defaultValue="events">
        <Tabs.List className="mb-4">
          <Tabs.Tab value="events">Events</Tabs.Tab>
          <Tabs.Tab value="checkins">Check-Ins</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="events">
          <div className="flex justify-between items-center">
            <strong className="text-2xl">Spring 2025</strong>
            <div className="flex gap-4">
              <ModalFormButton
                title="Create Event"
                form={<CreateEventForm />}
              />
              <RefreshButton action={refreshEvents} />
            </div>
          </div>
          <EventsTable />
        </Tabs.Panel>
        <Tabs.Panel value="checkins">
          <CurrentEvent />
          <Divider my="md" />
          <div className="flex justify-between items-center">
            <strong className="text-2xl">Check-Ins</strong>
            <RefreshButton action={refreshCheckins} />
          </div>
          <EventsTable />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
