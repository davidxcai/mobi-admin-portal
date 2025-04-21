import { Divider } from "@mantine/core";
import { OverviewChart } from "../components/OverviewChart";
import { EventsTable } from "../features/events/EventsTable";
import { useGetSession } from "../hooks/useAuth";

import { formattedDate } from "../utils/date";

export function Dashboard() {
  const { session } = useGetSession();
  if (!session) {
    console.log("No session found");
  } else {
    console.log("Session data:", session);
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <strong className="text-3xl">{formattedDate()}</strong>
      <p>Events today: None</p>
      <Divider my="sm" />
      <OverviewChart />
      <strong>Upcoming Events</strong>
      <EventsTable />
    </div>
  );
}
