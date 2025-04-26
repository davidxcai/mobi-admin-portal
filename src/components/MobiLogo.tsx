import { Flex, Stack } from "@mantine/core";
import mobiLogo from "../assets/MOBI Logo.svg";

export function MobiLogo() {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            h="100%"
            className="flex-1"
        >
            <img src={mobiLogo} alt="Mobi Byte Logo" />
            <Stack className="mt-8">
                <p className="space-grotesk text-5xl font-bold text-center">
                    MOBI BYTE
                </p>
                <p className="space-grotesk text-4xl font-bold text-center">
                    ADMIN PORTAL
                </p>
            </Stack>
        </Flex>
    );
}
