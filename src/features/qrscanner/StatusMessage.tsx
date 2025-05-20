import { useQRScanner } from "./QRScannerProvider";
import { Alert, Button } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useCurrentEvent } from "../../providers/CurrentEventProvider";

export function PendingMessage() {
  const { event: currentEvent } = useCurrentEvent();
  return (
    <Alert
      variant="light"
      color="indigo"
      radius="md"
      title="Processing Check-in"
      icon={<IconCircleCheck />}
      maw={400}
      mx={"auto"}
      my={20}
    >
      Checking-in to {currentEvent?.title}...
    </Alert>
  );
}

export function SuccessMessage() {
  const { resumeScanning, checkIn } = useQRScanner();
  const { event: currentEvent } = useCurrentEvent();
  const attendee = checkIn.data?.profile.first_name;
  const momocoins = checkIn.data?.momocoins;

  return (
    <Alert
      variant="light"
      color="teal"
      radius="md"
      title={`Welcome, ${attendee}!`}
      icon={<IconCircleCheck />}
      maw={400}
      mx={"auto"}
      my={20}
    >
      <p>Successfully checked-in to {currentEvent?.title}!</p>
      <p>Received {momocoins ?? null} momocoins.</p>
      <Button onClick={resumeScanning} color="teal" variant="light" mt="16">
        Continue
      </Button>
    </Alert>
  );
}

export function ErrorMessage() {
  const { resumeScanning, checkIn } = useQRScanner();
  const { event: currentEvent } = useCurrentEvent();
  return (
    <Alert
      variant="light"
      color="red"
      radius="md"
      title={`Error checking-in to ${currentEvent?.title}`}
      icon={<IconCircleCheck />}
      maw={400}
      mx={"auto"}
      my={20}
    >
      Error: {checkIn.error?.message}
      <Button onClick={resumeScanning} color="red" variant="light" mt="16">
        Continue
      </Button>
    </Alert>
  );
}

export function StatusMessages() {
  const { checkIn, scanState, scanning } = useQRScanner();
  const paused = scanState === 3;

  if (paused && scanning)
    return checkIn.isPending ? (
      <PendingMessage />
    ) : checkIn.isSuccess ? (
      <SuccessMessage />
    ) : checkIn.isError ? (
      <ErrorMessage />
    ) : null;
}
