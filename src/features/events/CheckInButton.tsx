import { Alert, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCreditCardPay, IconCircleCheck } from "@tabler/icons-react";
import { QRScanner } from "../qrscanner/QRScanner";
import { useCreateCheckIn } from "../../hooks";

export function CheckInButton() {
  const { isSuccess: checkInSuccess } = useCreateCheckIn();
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
        {checkInSuccess && (
          <Alert
            variant="filled"
            color="teal"
            radius="md"
            title="Welcome, User!"
            icon={<IconCircleCheck />}
            maw={400}
            mx={"auto"}
            my={20}
          >
            Successfully checked in to Social Coding
          </Alert>
        )}
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
