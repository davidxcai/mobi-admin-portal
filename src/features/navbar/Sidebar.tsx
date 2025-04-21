import { useLocation } from "react-router-dom";
import { LoginForm } from "../../forms/LoginForm";
import { RegisterForm } from "../../forms/RegisterForm";
import Navlinks from "./Navlinks";

export function Sidebar() {
  const location = useLocation();
  const isLoginPage = ["/login", "/"].includes(location.pathname);
  const isRegisterPage = location.pathname === "/register";
  return isLoginPage ? (
    <LoginForm />
  ) : isRegisterPage ? (
    <RegisterForm />
  ) : (
    <Navlinks />
  );
}
