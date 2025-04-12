import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Events</h1>
      <Outlet />
    </div>
  );
}
