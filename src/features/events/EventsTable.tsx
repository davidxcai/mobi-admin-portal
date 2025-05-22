import { Table, Flex, Title, TextInput } from "@mantine/core";
import { useGetCurrentSemesterEvents } from "../../hooks/useEvents";
import { formatDate, formatTime } from "../../utils/date";
import { ModalFormButton, RefreshButton } from "../../components/buttons/";
import { CreateEventForm } from "./CreateEventForm";
import { IconSearch } from "@tabler/icons-react";
import {
  SetCurrentEventButton,
  EditEventButton,
  DeleteEventButton,
} from "./EventButtons";

function EventsTableHeader({ eventCount }: { eventCount: number }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <Title order={3}>{eventCount} Events</Title>

        <div className="flex gap-4">
          <ModalFormButton title="Create Event" form={<CreateEventForm />} />
          <RefreshButton cache="events" />
        </div>
      </div>
      {/* Search Bar */}
      <TextInput
        leftSection={<IconSearch size={16} />}
        placeholder="Search events..."
        my="md"
      />
    </>
  );
}

export function EventsTable() {
  const {
    data: events,
    isPending,
    isError,
    error,
  } = useGetCurrentSemesterEvents();

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (!events) {
    return <div>No events found</div>;
  }
  const eventCount = events?.length || 0;

  const rows = events.map((event) => (
    <Table.Tr key={event.title}>
      <Table.Td>{event.title}</Table.Td>
      <Table.Td>{event.attendance}</Table.Td>
      <Table.Td>{event.momocoins}</Table.Td>
      <Table.Td>{formatDate(event?.starts_at)}</Table.Td>
      <Table.Td>
        {formatTime(event?.starts_at)} - {formatTime(event?.ends_at)}
      </Table.Td>
      <Table.Td>{event.location}</Table.Td>
      <Table.Td>
        <Flex gap="sm">
          <SetCurrentEventButton event={event} />
          <EditEventButton event={event} />
          <DeleteEventButton event={event} />
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <EventsTableHeader eventCount={eventCount} />
      <Table.ScrollContainer type="native" minWidth={500}>
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Attendance</Table.Th>
              <Table.Th>Momocoins</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
