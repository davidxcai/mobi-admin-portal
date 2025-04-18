import { AreaChart } from "@mantine/charts";
import { chartData } from "../development/data";

export function OverviewChart() {
  return (
    <>
      <strong className="text-2xl">Spring 2025 Attendance</strong>
      <div className="flex flex-row gap-4">
        <span>Members: 20</span>
        <span>New Members: 12</span>
        <span>Attendance: 300</span>
      </div>
      <AreaChart
        h={300}
        data={chartData}
        dataKey="date"
        series={[
          { name: "members", color: "indigo.6" },
          { name: "new_members", color: "blue.6" },
          { name: "attendance", color: "teal.6" },
        ]}
        curveType="linear"
        tickLine="xy"
      />
    </>
  );
}
