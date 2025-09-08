import { createTheme, DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";
import { blue, dark } from "./colors";

const themeOverride = createTheme({
    colors: {
        blue,
        dark,
    },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
