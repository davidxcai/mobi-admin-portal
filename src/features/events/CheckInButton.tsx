import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCreditCardPay } from "@tabler/icons-react";

export function CheckInButton() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        title="Check-In"
        position="bottom"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {/* Drawer content */}
      </Drawer>
      <Button
        color="blue"
        onClick={open}
        size="compact-sm"
        leftSection={<IconCreditCardPay size={14} />}
      >
        Check-In
      </Button>
    </>
  );
}
