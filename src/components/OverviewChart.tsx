import { BarChart } from "@mantine/charts";
import { chartData } from "../development/data";
import type { Profile, CheckIn } from "../types/models";

export function OverviewChart({
    profiles,
    checkins,
}: {
    profiles: Profile[];
    checkins: CheckIn[];
}) {
    console.log(profiles);
    console.log(checkins);
    return (
        <>
            <BarChart
                h={300}
                data={chartData}
                dataKey="date"
                series={[
                    { name: "members", color: "indigo.6" },
                    { name: "new_members", color: "blue.6" },
                    { name: "attendance", color: "teal.6" },
                ]}
                tickLine="xy"
            />
        </>
    );
}
