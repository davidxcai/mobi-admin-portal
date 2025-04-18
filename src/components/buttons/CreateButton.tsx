import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

type CreateButtonProps = {
  title: string;
  form: React.ReactNode;
  onConfirm: () => void;
};

export function CreateButton({ title, form, onConfirm }: CreateButtonProps) {
  const openModal = () =>
    modals.openConfirmModal({
      title: title,
      size: "sm",
      radius: "md",
      centered: true,
      withCloseButton: true,
      children: form,
      labels: { confirm: "Create", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: onConfirm,
    });
  return (
    <Button
      size="compact-sm"
      variant="filled"
      leftSection={<IconPlus size={14} />}
      onClick={openModal}
    >
      Create
    </Button>
  );
}
