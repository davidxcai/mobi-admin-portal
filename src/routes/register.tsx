import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grow flex justify-center items-center">
      Hello "/register"!
    </div>
  );
}
