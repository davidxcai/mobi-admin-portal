import { Card, Tabs, Title, Text, Stack } from "@mantine/core";
import { EventsTable, CheckInsTable, CurrentEvent } from "../features/events";
import { useCurrentEvent } from "../providers/CurrentEventProvider";
import { QRScannerProvider } from "../features/qrscanner/QRScannerProvider";
import { RefreshButton } from "../components/buttons";

// TODO:
// implement search function
// implement filter row function
// implement filter column function

// implement edit event button
// implement delete event button
// implement update/edit checkin button

export function Events() {
  const { currentEvent } = useCurrentEvent();
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
          {currentEvent && (
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
