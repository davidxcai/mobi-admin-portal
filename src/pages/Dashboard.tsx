import { Card, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import { OverviewChart } from "../components/OverviewChart";
import { StatsGrid } from "../features/dashboard/StatsGrid";
import { useGetAllProfiles, useGetAllCheckIns } from "../hooks";
import { formattedDate } from "../utils/date";
import { useState } from "react";

// TODO:
// connect data to backend
// create functions for calculating stats
// implment show data from current semester only
// fix bar graph to show data from current semester only
// implement semester select for bar graph
// limit upcoming events to 5

export function Dashboard() {
    const { data: profiles, isPending: isLoadingProfiles } =
        useGetAllProfiles();
    const { data: eventCheckIns, isPending: isLoadingCheckIns } =
        useGetAllCheckIns();
    console.log("dashboard profiles", profiles);
    console.log("dashboard eventCheckIns", eventCheckIns);

    const [currentTab, setCurrentTab] = useState("overview");

    return (
        <Stack>
            <Title order={1}>{formattedDate()}</Title>
            <Text c="dimmed" size="sm">
                Dashboard overview of MOBI organization metrics and upcoming
                events.
            </Text>
            {isLoadingProfiles || isLoadingCheckIns ? (
                <Text>Loading monthly metrics...</Text>
            ) : (
                <StatsGrid
                    profiles={profiles ?? []}
                    checkins={eventCheckIns ?? []}
                />
            )}
            <Card>
                <div>
                    <SegmentedControl
                        value={currentTab}
                        onChange={setCurrentTab}
                        data={[
                            { value: "overview", label: "Overview" },
                            { value: "new_members", label: "New Members" },
                            { value: "total_members", label: "Total Members" },
                            { value: "attendance", label: "Attendance" },
                        ]}
                        withItemsBorders={false}
                        mb="xl"
                    />
                </div>
                {currentTab === "overview" && (
                    <OverviewChart
                        profiles={profiles ?? []}
                        checkins={eventCheckIns ?? []}
                    />
                )}
            </Card>

            {/* <Card>
                <strong className="text-2xl">Upcoming Events</strong>
                <EventsTable />
            </Card> */}
        </Stack>
    );
}
