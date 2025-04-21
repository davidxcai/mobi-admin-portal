import { Stack } from "@mantine/core";
import mobiLogo from "../assets/MOBI Logo.svg";

export function MobiLogo() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={mobiLogo} alt="Mobi Byte Logo" />
      <Stack>
        <p className="space-grotesk text-5xl font-bold text-center">
          MOBI BYTE
        </p>
        <p className="space-grotesk text-4xl font-bold text-center">
          ADMIN PORTAL
        </p>
      </Stack>
    </div>
  );
}
