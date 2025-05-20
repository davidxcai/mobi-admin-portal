import { IconRefresh } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";

export function RefreshButton({ cache }: { cache: string }) {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: [cache] });
  };
  return (
    <Button
      size="compact-sm"
      variant="outline"
      leftSection={<IconRefresh size={14} />}
      onClick={refresh}
    >
      Refresh
    </Button>
  );
}
