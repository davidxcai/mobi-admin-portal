import { Card, Tabs, Text, Title } from "@mantine/core";
import { OverviewChart } from "../components/OverviewChart";
import { EventsTable } from "../features/events/EventsTable";
import { IconPhoto, IconMessageCircle } from "@tabler/icons-react";
import { StatsGrid } from "../features/dashboard/StatsGrid";

import { formattedDate } from "../utils/date";

// TODO:
// connect data to backend
// create functions for calculating stats
// implment show data from current semester only
// fix bar graph to show data from current semester only
// implement semester select for bar graph
// limit upcoming events to 5

export function Dashboard() {
  return (
    <div className="flex flex-col h-full gap-4">
      <Title order={1}>{formattedDate()}</Title>
      <Text c="dimmed" size="sm">
        Dashboard overview of MOBI organization metrics and upcoming events.
      </Text>
      <StatsGrid />
      <Card>
        <Tabs defaultValue="gallery">
          <Tabs.List mb="lg">
            <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
              Attendance
            </Tabs.Tab>
            <Tabs.Tab
              value="messages"
              leftSection={<IconMessageCircle size={12} />}
            >
              Member Growth
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="gallery">
            <OverviewChart />
          </Tabs.Panel>

          <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
        </Tabs>
      </Card>

      <Card>
        <strong className="text-2xl">Upcoming Events</strong>
        <EventsTable />
      </Card>
    </div>
  );
}
