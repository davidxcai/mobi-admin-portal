// React
import { StrictMode } from "react"; // For development (will render components twice)
import ReactDOM from "react-dom/client";
import { App } from "./App";

// Mantine
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

// React Router
import { BrowserRouter } from "react-router-dom";
import "./styles.css";

// TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

// Auth Provider
import { AuthProvider } from "./providers/AuthProvider";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AuthProvider>
                        <MantineProvider defaultColorScheme="dark">
                            <Notifications />
                            <ModalsProvider>
                                <App />
                            </ModalsProvider>
                        </MantineProvider>
                    </AuthProvider>
                </BrowserRouter>
                <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition="top-right"
                />
            </QueryClientProvider>
        </StrictMode>
    );
}

// Guidelines for app structure:
// Use tailwindcss for layout, positioning, and transitions
// Use mantine for components, theming, and styles
// Use react-query for data fetching, caching, and synchronization
// Use react-router for routing and navigation
