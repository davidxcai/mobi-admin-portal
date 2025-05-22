import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserScan } from "@tabler/icons-react";
import { QRScanner } from "../qrscanner/QRScanner";

export function CheckInButton() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer
        offset={8}
        size="100%"
        radius="md"
        opened={opened}
        onClose={close}
        position="bottom"
      >
        <h1 className="text-3xl text-center pb-4 font-bold">Check-In</h1>

        <QRScanner />
      </Drawer>
      <Button
        color="blue"
        onClick={open}
        size="sm"
        leftSection={<IconUserScan size={20} />}
      >
        Check-In
      </Button>
    </>
  );
}
