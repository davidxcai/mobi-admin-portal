import { Button } from "@mantine/core";
import { IconQrcode } from "@tabler/icons-react";
import { useCameraAvailable } from "./QRCameraAvailable";
import { useQRScanner } from "./QRScannerProvider";
import { StatusMessages } from "./StatusMessage";
import { useEffect } from "react";

// TODO:
// - Add a loading state while the camera is being accessed

export function QRScanner() {
  const isCameraAvailable = useCameraAvailable();
  const {
    toggleScanning,
    scanning,
    targetElementId,
    stopScanning,
    scannerRef,
  } = useQRScanner();
  const scanState = scanStateMessage();

  // Stop scanning when the component unmounts
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        stopScanning();
      }
    };
  }, []);

  if (!isCameraAvailable)
    return <p className="text-rose-400">No camera detected on this device</p>;

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={toggleScanning}
        color={scanning ? "red" : "indigo"}
        leftSection={<IconQrcode size={24} />}
      >
        {scanning ? "Stop Scanning" : "Scan QR Code"}
      </Button>
      {scanState}
      <StatusMessages />
      <div className="w-full max-w-xs rounded-md">
        <div id={targetElementId} />
      </div>
    </div>
  );
}

function scanStateMessage() {
  const { scanState } = useQRScanner();

  switch (scanState) {
    case 0:
      return <p>Scan State Unknown</p>;
    case 1:
      return <p>Not Scanning</p>;
    case 2:
      return <p>Scanning</p>;
    case 3:
      return <p>Paused</p>;
    default:
      return <p>Loading...</p>;
  }
}
