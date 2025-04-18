import { useLocation } from "react-router-dom";
import { LoginForm } from "../../forms/LoginForm";
import Navlinks from "./Navlinks";

export function Sidebar() {
  const location = useLocation();
  const isLoginPage = ["/login", "/"].includes(location.pathname);
  return (
    <nav
      className={`flex flex-col h-full bg-slate-900 ${isLoginPage ? "w-1/2" : "w-3xs"}`}
    >
      {isLoginPage ? <LoginForm /> : <Navlinks />}
    </nav>
  );
}
