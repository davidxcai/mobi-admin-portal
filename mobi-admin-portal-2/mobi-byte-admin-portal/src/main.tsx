import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import "./style/main.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider, ColorSchemeScript } from "@mantine/core";

const queryClient = new QueryClient();

const theme = createTheme({});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <App />
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
