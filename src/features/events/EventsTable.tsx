import { Table, Badge, Flex, ActionIcon } from "@mantine/core";
import { useCurrentEvent } from "../../context/CurrentEventContext";
import { useGetAllEvents } from "../../hooks/useEvents";
import { Event } from "../../types/models";
import { IconPin, IconEdit, IconTrash } from "@tabler/icons-react";

export function EventsTable() {
    const { data: events, isPending, isError, error } = useGetAllEvents();
    const { event: currentEvent, setCurrentEvent } = useCurrentEvent();

    const isCurrentEvent = (event: Event) => {
        return (
            currentEvent?.id === event.id && (
                <Badge size="sm" color="blue">
                    Current Event
                </Badge>
            )
        );
    };

    if (isPending) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    if (!events) {
        return <div>No events found</div>;
    }

    const rows = events.map((event) => (
        <Table.Tr key={event.title}>
            <Table.Td>{event.title}</Table.Td>
            <Table.Td>{event.attendance}</Table.Td>
            <Table.Td>{event.momocoins}</Table.Td>
            <Table.Td>{event?.starts_at.toString()}</Table.Td>
            <Table.Td>{event?.ends_at.toString()}</Table.Td>
            <Table.Td>{event.location}</Table.Td>
            <Table.Td>
                <Flex gap="sm">
                    <ActionIcon
                        size="sm"
                        variant={isCurrentEvent(event) ? "filled" : "outline"}
                        onClick={() => setCurrentEvent(event)}
                    >
                        <IconPin size={16} />
                    </ActionIcon>
                    <ActionIcon size="sm" variant="outline">
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon size="sm" variant="outline" color="red">
                        <IconTrash size={16} />
                    </ActionIcon>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer type="native" minWidth={500}>
            <Table highlightOnHover verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Attendance</Table.Th>
                        <Table.Th>Momocoins</Table.Th>
                        <Table.Th>Start</Table.Th>
                        <Table.Th>End</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
