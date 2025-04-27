import { Button, Flex, Group, Stack, Title, Text } from "@mantine/core";
import { CheckInButton } from "./CheckInButton";
import {
    IconEdit,
    IconCalendar,
    IconClock,
    IconMapPin,
    IconUsers,
} from "@tabler/icons-react";
import { useCurrentEvent } from "../../context/CurrentEventContext";

export function CurrentEvent() {
    const { event, setCurrentEvent } = useCurrentEvent();
    if (!event) {
        return <h1>No Current Event selected.</h1>;
    }
    console.log("CurrentEvent", event.attendance);
    return (
        <div className="flex flex-col h-full gap-4">
            <Flex justify="space-between">
                <Stack>
                    <Title order={3}>{event.title}</Title>
                    <Text size="sm" c="dimmed">
                        Current active event details and attendance
                    </Text>
                </Stack>
                <Flex gap="md">
                    <CheckInButton />
                    <Button
                        size="compact-sm"
                        variant="outline"
                        leftSection={<IconEdit size={14} />}
                    >
                        Update
                    </Button>
                    <Button
                        size="compact-sm"
                        variant="outline"
                        color="red"
                        onClick={() => setCurrentEvent(null)}
                    >
                        Remove
                    </Button>
                </Flex>
            </Flex>
            <Group>
                <Text c="dimmed">
                    <IconMapPin />
                </Text>
                {event.location}
            </Group>
            <Group>
                <Text c="dimmed">
                    <IconCalendar />
                </Text>
                <Text>{event.starts_at.toString()}</Text>
            </Group>
            <Group>
                <Text c="dimmed">
                    <IconClock />
                </Text>
                {event.ends_at.toString()}
            </Group>
            <Group>
                <Text c="dimmed">
                    <IconUsers />
                </Text>
                {event.attendance.toString()}
            </Group>
        </div>
    );
}
