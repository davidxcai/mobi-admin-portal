import { useLocation } from "react-router-dom";
import { LoginForm } from "../../forms/LoginForm";
import Navlinks from "./Navlinks";

export function Sidebar() {
  const location = useLocation();
  const isLoginPage = ["/login", "/", "/register"].includes(location.pathname);
  return isLoginPage ? <LoginForm /> : <Navlinks />;
}
