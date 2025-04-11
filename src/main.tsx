import { StrictMode } from "react"; // For development (will render components twice)

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
const router = createRouter({ routeTree });

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider defaultColorScheme="dark">
          <ModalsProvider>
            <RouterProvider router={router} />
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
