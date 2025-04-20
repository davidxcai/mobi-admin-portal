// QRScannerHtml5.tsx
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";

export function QRScanner() {
  const [cameraAvailable, setCameraAvailable] = useState(false);
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrRegionId = "qr-reader";

  useEffect(() => {
    async function checkCamera() {
      const available = await hasCamera();
      setCameraAvailable(available);
    }

    checkCamera();
  }, []);

  async function hasCamera(): Promise<boolean> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return false;
    }
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.some((device) => device.kind === "videoinput");
  }

  useEffect(() => {
    if (scanning) {
      const qrScanner = new Html5Qrcode(qrRegionId);
      scannerRef.current = qrScanner;

      qrScanner
        .start(
          { facingMode: "environment" }, // Rear camera
          {
            fps: 10, // Captures per second
            qrbox: { width: 250, height: 250 }, // Size of the scanning box
          },
          (decodedText) => {
            alert(`Scanned QR Code: ${decodedText}`);
            qrScanner.stop();
            setScanning(false);
          },
          (errorMessage) => {
            console.warn(errorMessage);
          }
        )
        .catch((err) => {
          console.error(err);
          alert("Failed to start QR scanner.");
          setScanning(false);
        });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch((err) => console.error("Stop failed", err));
      }
    };
  }, [scanning]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() => setScanning(true)}
        disabled={scanning || !cameraAvailable}
        leftSection={<IconCamera size={24} />}
      >
        Scan QR Code
      </Button>

      {scanning && <div id={qrRegionId} className="w-full max-w-xs" />}
    </div>
  );
}
