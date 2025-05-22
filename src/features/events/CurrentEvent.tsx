import {
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { CheckInButton } from "./CheckInButton";
import {
  IconEdit,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconUsers,
  IconPin,
} from "@tabler/icons-react";
import { useCurrentEvent } from "../../providers/CurrentEventProvider";
import { useMediaQuery } from "@mantine/hooks";
import type { Event } from "../../types/models";
import { formatDate, formatTime, formatWeekDay } from "../../utils/date";

export function CurrentEvent() {
  const { currentEvent, setCurrentEvent } = useCurrentEvent();
  if (!currentEvent) {
    return <h1>No Current Event selected.</h1>;
  }
  console.log("CurrentEvent", currentEvent.attendance);
  return (
    <Card mb="lg" className="flex flex-col h-full gap-4 grow">
      <Flex justify="space-between">
        <Stack>
          <Group>
            <IconPin />
            <Title order={3}>{currentEvent.title}</Title>
          </Group>
          <Text size="sm" c="dimmed">
            Current active event details and attendance
          </Text>
        </Stack>
      </Flex>
      <EventDetails {...currentEvent} />
      <Divider />
      <Buttons setCurrentEvent={() => setCurrentEvent(null)} />
    </Card>
  );
}

function Buttons({ setCurrentEvent }: { setCurrentEvent: () => void }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const flexDirection = isMobile ? "flex-col" : "flex-row";
  return (
    <div className={`flex ${flexDirection} gap-4`}>
      <CheckInButton />
      <Button size="sm" variant="outline" leftSection={<IconEdit size={20} />}>
        Update
      </Button>
      <Button
        size="sm"
        variant="outline"
        color="red"
        onClick={setCurrentEvent}
        leftSection={<IconPin size={20} />}
      >
        Unpin
      </Button>
    </div>
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
