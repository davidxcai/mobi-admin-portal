// QRScannerHtml5.tsx
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useCurrentEvent } from "../../context/CurrentEventContext";
import { useCameraAvailable } from "./QRCameraAvailable";
import { useCreateCheckIn } from "../../hooks";
import { useAuth } from "../../providers/AuthProvider";

export function QRScanner() {
  const { event: currentEvent } = useCurrentEvent();
  const { session } = useAuth();
  const {
    mutate: createCheckIn,
    isPending,
    isError,
    error,
  } = useCreateCheckIn();
  const cameraAvailable = useCameraAvailable();
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrRegionId = "qr-reader";

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
            aspectRatio: 1.0,
            experimentalFeatures: {
              useBarCodeDetectorIfSupported: true, // Modern devices: uses built-in fast scanner
            },
            showScanRegion: true,
          } as any,
          async (profileId) => {
            // Success callback

            // Trigger haptic feedback if available
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }
            if (!session?.user) {
              throw new Error("User not logged in");
            }

            if (!currentEvent) {
              throw new Error("Event not found");
            }

            const data = {
              profileId,
              event: currentEvent,
              user: session?.user,
            };

            createCheckIn(data);

            if (isPending) {
              console.log("Creating check-in...");
            }
            if (isError) {
              console.error("Error creating check-in:", error);
              notifications.show({
                title: "Error",
                message: "Failed to create check-in",
                color: "red",
                autoClose: 3000,
              });
            }

            // Show success notification
            notifications.show({
              title: "QR Code Scanned!",
              message: `Checked ${profileId} into ${currentEvent?.title}`,
              color: "green",
              autoClose: 3000,
            });
            if (scannerRef.current) {
              await scannerRef.current.stop();
              scannerRef.current = null;
            }
            setScanning(false);

            // Restart scanning after 5 seconds
            // setTimeout(() => {
            //   setScanning(true);
            // }, 5000);
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
          .catch((err) => console.error("Stop failed", err))
          .finally(() => {
            scannerRef.current = null;
          });
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
        {scanning ? "Scanning..." : "Scan QR Code"}
      </Button>
      {!cameraAvailable && (
        <p className="text-rose-400">No camera detected on this device</p>
      )}
      {scanning && <div id={qrRegionId} className="w-full max-w-xs" />}
    </div>
  );
}
