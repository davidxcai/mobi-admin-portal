import { IconRefresh } from "@tabler/icons-react";
import { Button } from "@mantine/core";

type RefreshButtonProps = {
  action: () => void;
};

export function RefreshButton({ action }: RefreshButtonProps) {
  return (
    <Button
      size="compact-sm"
      variant="outline"
      leftSection={<IconRefresh size={14} />}
      onClick={action}
    >
      Refresh
    </Button>
  );
}
