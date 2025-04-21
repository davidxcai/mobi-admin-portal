import { Text } from "@mantine/core";

export function MobiText() {
  return (
    <Text
      variant="gradient"
      gradient={{ from: "rgba(41, 176, 255, 1)", to: "#9E83FF", deg: 90 }}
      fw={700}
      size="xl"
      className="space-grotesk"
    >
      MOBI BYTE
    </Text>
  );
}
