import { ActionIcon } from "@mantine/core";
import { IconPin, IconEdit, IconTrash } from "@tabler/icons-react";
import { useCurrentEvent } from "../../providers/CurrentEventProvider";
import type { Event } from "../../types/models";
import { modals } from "@mantine/modals";
import { useDeleteEvent } from "../../hooks/useEvents";
import { EditEventForm } from "./EditEventForm";

export function SetCurrentEventButton({ event }: { event: Event }) {
  const { currentEvent, setCurrentEvent } = useCurrentEvent();
  const isCurrentEvent = currentEvent?.id === event.id;
  return (
    <ActionIcon
      size="sm"
      variant={isCurrentEvent ? "filled" : "transparent"}
      onClick={() => setCurrentEvent(event)}
    >
      <IconPin size={20} />
    </ActionIcon>
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
    <ActionIcon size="sm" variant="transparent" onClick={openModal}>
      <IconEdit size={20} />
    </ActionIcon>
  );
}

export function DeleteEventButton({ event }: { event: Event }) {
  const { mutate: deleteEvent } = useDeleteEvent();
  const warningMessage = (
    <div>
      <p>Are you sure you want to delete {event.title}?</p>
      <p>
        This action cannot be undone and all check-ins for {event.title} will
        also be deleted.
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
    <ActionIcon size="sm" variant="transparent" color="red" onClick={openModal}>
      <IconTrash size={20} />
    </ActionIcon>
  );
}
