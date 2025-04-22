import { useEffect, useState } from "react";

export function useCameraAvailable() {
  const [isCameraAvailable, setisCameraAvailable] = useState<Boolean>(false);
  useEffect(() => {
    async function checkCamera() {
      const available = await hasCamera();
      setisCameraAvailable(available);
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
  return isCameraAvailable;
}
