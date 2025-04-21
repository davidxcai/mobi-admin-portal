import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

type ModalFormButtonProps = {
  title: string;
  form: React.ReactNode;
};

export function ModalFormButton({ title, form }: ModalFormButtonProps) {
  const openModal = () =>
    modals.open({
      title: title,
      size: "sm",
      radius: "md",
      centered: true,
      withCloseButton: true,
      children: form,
    });
  return (
    <Button
      size="compact-sm"
      variant="filled"
      leftSection={<IconPlus size={14} />}
      onClick={openModal}
    >
      {title}
    </Button>
  );
}
