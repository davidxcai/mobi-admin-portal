// hooks/useQRScanner.ts
import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { notifications } from "@mantine/notifications";
import { useCurrentEvent } from "../../providers/CurrentEventProvider";
import { useGetUser, useCreateCheckIn } from "../../hooks";

const cameraConfig = { facingMode: "environment" };
const scanConfig: any = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1.0,
    experimentalFeatures: { useBarCodeDetectorIfSupported: true },
    showScanRegion: true,
};

export function useQRScanner(
    scanning: boolean,
    setScanning: (val: boolean) => void
) {
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const { event: currentEvent } = useCurrentEvent();
    const { data: admin } = useGetUser();
    const {
        mutate: createCheckIn,
        isPending,
        isError,
        error,
    } = useCreateCheckIn();
    const qrRegionId = "qr-reader";

    useEffect(() => {
        if (!scanning) return;

        const qrScanner = new Html5Qrcode(qrRegionId);
        scannerRef.current = qrScanner;

        qrScanner
            .start(
                cameraConfig,
                scanConfig,
                async (attendee) => {
                    if (navigator.vibrate) navigator.vibrate(200);
                    if (!currentEvent || !admin) {
                        console.error("Missing event or admin");
                        return;
                    }

                    createCheckIn({ attendee, event: currentEvent, admin });

                    notifications.show({
                        title: "QR Code Scanned!",
                        message: `Checked ${attendee} into ${currentEvent?.title}`,
                        color: "green",
                        autoClose: 3000,
                    });

                    await qrScanner.stop();
                    scannerRef.current = null;
                    setScanning(false);
                },
                (errorMessage) => {
                    console.warn("QR scan error:", errorMessage);
                }
            )
            .catch((err) => {
                console.error("Failed to start scanner:", err);
                notifications.show({
                    title: "Scanner Error",
                    message: "Could not access camera",
                    color: "red",
                });
                setScanning(false);
            });

        return () => {
            scannerRef.current
                ?.stop()
                .catch((err) => console.error("Stop failed:", err))
                .finally(() => {
                    scannerRef.current = null;
                });
        };
    }, [scanning]);

    return { isPending, isError, error };
}
