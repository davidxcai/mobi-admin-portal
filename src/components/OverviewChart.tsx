import { BarChart } from "@mantine/charts";
import { chartData } from "../development/data";
import { Select } from "@mantine/core";

export function OverviewChart() {
    return (
        <>
            <Select
                label="Semester"
                placeholder="Select semester"
                defaultValue={"Spring 2025"} // Default should be the first item in the data array
                data={["Spring 2025", "Fall 2024", "Spring 2024", "Fall 2023"]}
                maw={200}
                mb="lg"
            />
            <BarChart
                h={300}
                data={chartData}
                dataKey="date"
                series={[
                    { name: "members", color: "indigo.6" },
                    { name: "new_members", color: "blue.6" },
                    { name: "attendance", color: "teal.6" },
                ]}
                // curveType="linear"
                tickLine="xy"
            />
        </>
    );
}
