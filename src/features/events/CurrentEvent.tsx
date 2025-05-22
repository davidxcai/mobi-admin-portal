import { Button, Flex, Group, Stack, Title, Text } from "@mantine/core";
import { CheckInButton } from "./CheckInButton";
import {
  IconEdit,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconUsers,
} from "@tabler/icons-react";
import { useCurrentEvent } from "../../providers/CurrentEventProvider";
import type { Event } from "../../types/models";
import { formatDate, formatTime, formatWeekDay } from "../../utils/date";

export function CurrentEvent() {
  const { currentEvent, setCurrentEvent } = useCurrentEvent();
  if (!currentEvent) {
    return <h1>No Current Event selected.</h1>;
  }
  console.log("CurrentEvent", currentEvent.attendance);
  return (
    <div className="flex flex-col h-full gap-4">
      <Flex justify="space-between">
        <Stack>
          <Title order={3}>{currentEvent.title}</Title>
          <Text size="sm" c="dimmed">
            Current active event details and attendance
          </Text>
        </Stack>
        <Buttons setCurrentEvent={() => setCurrentEvent(null)} />
      </Flex>
      <EventDetails {...currentEvent} />
    </div>
  );
}

function Buttons({ setCurrentEvent }: { setCurrentEvent: () => void }) {
  return (
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
        onClick={setCurrentEvent}
      >
        Remove
      </Button>
    </Flex>
  );
}

function EventDetails(event: Event) {
  return (
    <>
      {/* Location */}
      <Group>
        <Text c="dimmed">
          <IconMapPin />
        </Text>
        {event.location}
      </Group>
      {/* Date */}
      <Group>
        <Text c="dimmed">
          <IconCalendar />
        </Text>
        <Text>
          {formatWeekDay(event.starts_at)}, {formatDate(event.starts_at)}
        </Text>
      </Group>
      {/* Time */}
      <Group>
        <Text c="dimmed">
          <IconClock />
        </Text>
        {formatTime(event.starts_at)} - {formatTime(event.ends_at)}
      </Group>
      {/* Attendance */}
      <Group>
        <Text c="dimmed">
          <IconUsers />
        </Text>
        {event.attendance.toString()}
      </Group>
    </>
  );
}
