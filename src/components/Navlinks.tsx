import { Link } from "@tanstack/react-router";

export default function Navlinks() {
  return (
    <div className="flex flex-col gap-4">
      <Link to="/overview">Overview</Link>
      <Link to="/users">Users</Link>
      <Link to="/events">Events</Link>
    </div>
  );
}
