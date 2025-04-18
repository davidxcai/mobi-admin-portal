import { Tabs, Divider } from "@mantine/core";
import { EventsTable, CurrentEvent, CreateEventForm } from "../features/events";
import { CreateButton, RefreshButton } from "../components/buttons";

export function Events() {
  const createEvent = () => {
    console.log("Event created");
  };
  const refreshEvents = () => {
    console.log("Refresh events");
  };
  const refreshCheckins = () => {
    console.log("Refresh check-ins");
  };
  return (
    <div className="flex flex-col h-full gap-4">
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
              <CreateButton
                title="Create Event"
                form={<CreateEventForm />}
                onConfirm={createEvent}
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
    </div>
  );
}
