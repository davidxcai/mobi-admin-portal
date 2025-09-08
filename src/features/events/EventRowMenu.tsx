import { Menu } from "@mantine/core";
import { IconPin, IconEdit, IconTrash } from "@tabler/icons-react";
import { useCurrentEvent } from "../../providers/CurrentEventProvider";
import type { Event } from "../../types/models";
import { modals } from "@mantine/modals";
import { useDeleteEvent } from "../../hooks/useEvents";
import { EditEventForm } from "./EditEventForm";

export function EventRowMenu({
    children,
    event,
}: {
    children: React.ReactNode;
    event: Event;
}) {
    return (
        <Menu shadow="md" width={200} withArrow position="bottom" offset={-10}>
            <Menu.Target>{children}</Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>{event.title}</Menu.Label>
                <SetCurrentEventButton event={event} />
                <EditEventButton event={event} />
                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <DeleteEventButton event={event} />
            </Menu.Dropdown>
        </Menu>
    );
}

export function SetCurrentEventButton({ event }: { event: Event }) {
    const { currentEvent, setCurrentEvent } = useCurrentEvent();
    const isCurrentEvent = currentEvent?.id === event.id;
    return (
        <Menu.Item
            leftSection={<IconPin size={14} />}
            onClick={() => setCurrentEvent(isCurrentEvent ? null : event)}
        >
            {isCurrentEvent ? "Remove current event" : "Set as Current Event"}
        </Menu.Item>
    );
}

export function EditEventButton({ event }: { event: Event }) {
    const openModal = () => {
        modals.open({
            title: "Edit Event",
            size: "sm",
            radius: "md",
            centered: true,
            withCloseButton: true,
            children: <EditEventForm event={event} />,
        });
    };
    return (
        <Menu.Item leftSection={<IconEdit size={14} />} onClick={openModal}>
            Edit
        </Menu.Item>
    );
}

export function DeleteEventButton({ event }: { event: Event }) {
    const { mutate: deleteEvent } = useDeleteEvent();
    const warningMessage = (
        <div>
            <p>Are you sure you want to delete {event.title}?</p>
            <p>
                This action cannot be undone and all check-ins for {event.title}{" "}
                will also be deleted.
            </p>
        </div>
    );
    const openModal = () => {
        modals.openConfirmModal({
            title: "Delete Event",
            size: "sm",
            radius: "md",
            centered: true,
            withCloseButton: true,
            children: warningMessage,
            labels: { confirm: "Delete Event", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => deleteEvent(event),
        });
    };
    return (
        <Menu.Item
            color="red"
            leftSection={<IconTrash size={14} />}
            onClick={openModal}
        >
            Delete Event
        </Menu.Item>
    );
}
