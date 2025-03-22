import LoginForm from "../login/LoginForm";
import SidebarMenu from "./SidebarMenu";
import { useLocation } from "react-router-dom";
import { Flex } from "@mantine/core";

function Sidebar() {
  const currentPage = useLocation().pathname;
  const isLoginPage = currentPage === "/";
  console.log("is login page: ", isLoginPage);
  return (
    <Flex
      direction={"column"}
      className={`sidebar ${isLoginPage ? "login-page" : ""}`}
    >
      {isLoginPage ? <LoginForm /> : <SidebarMenu />}
    </Flex>
  );
}

export default Sidebar;
