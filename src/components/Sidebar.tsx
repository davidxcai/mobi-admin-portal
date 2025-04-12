import RegistrationForm from "../forms/RegistrationForm";
import Navlinks from "./Navlinks";
import { MatchRoute, useMatch } from "@tanstack/react-router";

export default function Sidebar() {
  const match = useMatch({ from: "/register" });
  console.log("match", match);
  return (
    <nav className="w-1/6 h-full bg-blue-950 p-4">
      <MatchRoute to="/">
        <h1>Login?</h1>
      </MatchRoute>
      <MatchRoute to="/register">
        <RegistrationForm />
      </MatchRoute>
      <Navlinks />
    </nav>
  );
}
