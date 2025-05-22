import { Card, Tabs, TextInput, Title, Text, Stack } from "@mantine/core";
import {
  EventsTable,
  CheckInsTable,
  CurrentEvent,
  CreateEventForm,
} from "../features/events";
import { ModalFormButton, RefreshButton } from "../components/buttons";
import { IconSearch } from "@tabler/icons-react";
import { useCurrentEvent } from "../providers/CurrentEventProvider";
import { QRScannerProvider } from "../features/qrscanner/QRScannerProvider";

// TODO:
// format dates for rows and info
// add current event to cache from provider
// implement search function
// implement filter function
// implement edit event button
// implement delete event button

export function Events() {
  const { event } = useCurrentEvent();
  return (
    <Stack h="100%" gap="md">
      <Title order={1}>Events</Title>
      <Text c="dimmed" size="sm">
        Manage and track all MOBI organization events.
      </Text>
      <Tabs defaultValue="events">
        <Tabs.List className="mb-4">
          <Tabs.Tab value="events">Events</Tabs.Tab>
          <Tabs.Tab value="checkins">Check-Ins</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="events">
          <Card>
            <div className="flex justify-between items-center">
              <Title order={3}>2 Events</Title>

              <div className="flex gap-4">
                <ModalFormButton
                  title="Create Event"
                  form={<CreateEventForm />}
                />

                <RefreshButton cache="events" />
              </div>
            </div>
            <TextInput
              leftSection={<IconSearch size={16} />}
              placeholder="Search events..."
              my="md"
            />
            <EventsTable />
          </Card>
        </Tabs.Panel>
        <Tabs.Panel value="checkins">
          <Card mb="lg">
            <QRScannerProvider>
              <CurrentEvent />
            </QRScannerProvider>
          </Card>
          {/* <Divider my="md" /> */}
          {event && (
            <Card>
              <div className="flex justify-between items-center">
                <strong className="text-2xl">Check-Ins</strong>
                <RefreshButton cache="events" />
              </div>
              <CheckInsTable />
            </Card>
          )}
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
