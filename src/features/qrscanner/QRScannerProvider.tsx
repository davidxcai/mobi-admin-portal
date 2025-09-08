import { useEffect, useRef, createContext, useContext } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { useCurrentEvent } from "../../providers/CurrentEventProvider";
import { useGetUser, useCreateCheckIn } from "../../hooks";
import { useState } from "react";

type QRScannerContextType = {
  checkIn: ReturnType<typeof useCreateCheckIn>;
  scanning: boolean;
  scannerRef: React.RefObject<Html5Qrcode | null>;
  setScanning: React.Dispatch<React.SetStateAction<boolean>>;
  toggleScanning: () => void;
  stopScanning: () => void;
  resumeScanning: () => void;
  pauseScanning: () => void;
  scanState: Html5QrcodeScannerState | undefined;
  targetElementId: string;
};

const QRScannerContext = createContext<QRScannerContextType | null>(null);

const cameraConfig = { facingMode: "environment" };
const scanConfig: any = {
  fps: 1,
  qrbox: { width: 250, height: 250 },
  aspectRatio: 1.0,
  experimentalFeatures: { useBarCodeDetectorIfSupported: true },
  showScanRegion: true,
};

export function QRScannerProvider({ children }: { children: React.ReactNode }) {
  // Custom Hooks
  const { currentEvent } = useCurrentEvent();
  const { data: admin } = useGetUser();
  const checkIn = useCreateCheckIn();

  // Local State
  const [scanning, setScanning] = useState(false);
  const [scanState, setScanState] = useState<
    Html5QrcodeScannerState | undefined
  >(undefined);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Target Element ID
  const targetElementId = "qr-reader";

  async function onScanSuccess(decodedText: string) {
    if (!currentEvent || !admin) {
      console.error("No current event found");
      return;
    }
    const newCheckIn = {
      attendee: decodedText,
      event: currentEvent,
      admin: admin,
    };
    console.log("QR Code scanned");
    checkIn.mutate(newCheckIn);
    pauseScanning();
  }

  function onScanFailure(errorMessage: string) {
    console.warn("QR scan error:", errorMessage);
  }

  function pauseScanning() {
    scannerRef.current?.pause();
    setScanState(scannerRef.current?.getState());
  }

  function resumeScanning() {
    scannerRef.current?.resume();
    setScanState(scannerRef.current?.getState());
  }

  function stopScanning() {
    if (!scannerRef.current) return;

    scannerRef.current
      .stop()
      .then(() => scannerRef.current?.clear())
      .then(() => {
        setScanState(scannerRef.current?.getState());
        scannerRef.current = null; // Clear the reference to the scanner
        setScanning(false);
      })
      .catch((err) => {
        console.error("Failed to stop and clear scanner:", err);
      });
  }

  function toggleScanning() {
    setScanning((prev) => !prev);
    setScanState(scannerRef.current?.getState());
  }

  useEffect(() => {
    if (!scanning) return;

    const scanner = new Html5Qrcode(targetElementId);
    scannerRef.current = scanner;
    scanner
      .start(cameraConfig, scanConfig, onScanSuccess, onScanFailure)
      .then(() => {
        setScanState(scannerRef.current?.getState());
      })
      .catch((err) => {
        console.error("Failed to start scanner:", err);
        setScanning(false);
      });

    return () => {
      if (scannerRef.current) {
        stopScanning();
      }
    };
  }, [scanning]);

  const values = {
    checkIn,
    scanning,
    scannerRef,
    setScanning,
    toggleScanning,
    stopScanning,
    resumeScanning,
    pauseScanning,
    scanState,
    targetElementId,
  };

  return (
    <QRScannerContext.Provider value={values}>
      {children}
    </QRScannerContext.Provider>
  );
}

export function useQRScanner() {
  const context = useContext(QRScannerContext);
  if (!context) {
    throw new Error("useQRScanner must be used within a QRScannerProvider");
  }
  return context;
}
