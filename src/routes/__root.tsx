import { Outlet, createRootRoute } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";

export const Route = createRootRoute({
  component: RootComponent,
});

// This is the root route for the application.
// Acting as main layout for the application.
function RootComponent() {
  return (
    <main className="flex flex-row items-center h-screen">
      <Sidebar />
      {/* This is the main content area */}
      {/* <div className="bg-blue-950">Hello "__root"!</div> */}
      <div className="h-full grow p-12">
        <Outlet />
      </div>
    </main>
  );
}
