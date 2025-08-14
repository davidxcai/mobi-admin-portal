import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconUsersGroup,
    IconChartBar,
    IconHeart,
    IconUserPlus,
} from "@tabler/icons-react";
import {
    Group,
    Paper,
    SimpleGrid,
    Text,
    Title,
    NumberFormatter,
} from "@mantine/core";
import classes from "./StatsGrid.module.css";
import type { Profile, CheckInData } from "../../types/models";
import { CalculateDashboardMetrics } from "../../utils/data";

type Data = {
    title: string;
    icon: string;
    value: number;
    diff: number;
};

export function StatsGrid({
    profiles,
    checkins,
}: {
    profiles: Profile[];
    checkins: CheckInData[];
}) {
    // need to get profiles created this month, = new members
    // then divide by total number of profiles from previous month

    // get members.length
    // divide by total number of profiles, divided by total profiles - new profiles this month,

    //
    const data = CalculateDashboardMetrics(profiles, checkins);
    const stats = DisplayMetricCards(data);
    return (
        <div>
            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
        </div>
    );
}

function DisplayMetricCards(data: Data[]) {
    const icons = [IconUserPlus, IconChartBar, IconHeart, IconUsersGroup];
    console.log("data", data);
    let cards = data.map((stat, index) => {
        const Icon = icons[index];
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        const color = stat.diff > 0 ? "teal" : stat.diff < 0 ? "red" : "gray";

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group justify="space-between">
                    <Text size="xs" c="dimmed" className={classes.title}>
                        {stat.title}
                    </Text>
                    <Icon className={classes.icon} size={22} stroke={1.5} />
                </Group>

                <Group align="flex-end" gap="xs" mt={12}>
                    <Title className={classes.value}>{stat.value}</Title>
                    <Text
                        c={color}
                        // fz="sm"
                        fw={500}
                        className={classes.diff}
                    >
                        {stat.diff === 0 ? (
                            <span>No Change</span>
                        ) : (
                            <>
                                <span>{stat.diff}%</span>
                                <DiffIcon size={16} stroke={1.5} />
                            </>
                        )}
                    </Text>
                </Group>

                <Text fz="xs" c="dimmed" mt={7}>
                    Compared to previous month
                </Text>
            </Paper>
        );
    });
    return cards;
}
