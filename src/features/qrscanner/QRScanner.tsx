// components/QRScannerHtml5.tsx
import { useState } from "react";
import { Button } from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useCameraAvailable } from "./QRCameraAvailable";
import { useQRScanner } from "./useQRScanner";

export function QRScanner() {
    const cameraAvailable = useCameraAvailable();
    const [scanning, setScanning] = useState(false);
    const { isPending } = useQRScanner(scanning, setScanning);

    return (
        <div className="flex flex-col items-center gap-4">
            <Button
                onClick={() => setScanning(true)}
                disabled={scanning || !cameraAvailable}
                leftSection={<IconCamera size={24} />}
            >
                {scanning ? "Scanning..." : "Scan QR Code"}
            </Button>

            {isPending && <p>Checking in...</p>}
            {!cameraAvailable && (
                <p className="text-rose-400">
                    No camera detected on this device
                </p>
            )}
            {scanning && <div id="qr-reader" className="w-full max-w-xs" />}
        </div>
    );
}
