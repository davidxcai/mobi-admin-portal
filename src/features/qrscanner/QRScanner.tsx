import { Button } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useCameraAvailable } from "./QRCameraAvailable";
import { useQRScanner } from "./QRScannerProvider";
import { StatusMessages } from "./StatusMessage";
import { useEffect, useState } from "react";

// TODO:
// - Add a loading state while the camera is being accessed
// - stop scanning when the component unmounts
// - fix scan state to render correctly (currently 1 render behind)

export function QRScanner() {
  const isCameraAvailable = useCameraAvailable();
  const { toggleScanning, scanning, targetElementId } = useQRScanner();
  const scanState = scanStateMessage();

  if (!isCameraAvailable)
    return <p className="text-rose-400">No camera detected on this device</p>;

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={toggleScanning} leftSection={<IconCamera size={24} />}>
        {scanning ? "Scanning..." : "Scan QR Code"}
      </Button>
      {scanState}
      <StatusMessages />
      <div className="w-full max-w-xs">
        <div id={targetElementId} />
      </div>
    </div>
  );
}

function scanStateMessage() {
  const { scanState } = useQRScanner();
  const [state, setState] = useState<number | undefined>(0);
  useEffect(() => {
    setState(scanState);
  }, [scanState]);

  switch (state) {
    case 0:
      return <p>Scan State Unknown</p>;
    case 1:
      return <p>Not Scanning</p>;
    case 2:
      return <p>Scanning</p>;
    case 3:
      return <p>Paused</p>;
    default:
      return <p>Not Initialized</p>;
  }
}
