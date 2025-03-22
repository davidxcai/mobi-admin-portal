import { Flex } from "@mantine/core";
import LoginBanner from "../features/login/LoginBanner";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Events from "../pages/Events";
import { useLocation } from "react-router-dom";

function MainContainer() {
  const currentPage = useLocation().pathname;
  const isLoginPage = currentPage === "/";
  return (
    <Flex h="100vh" className={isLoginPage ? "login-page" : "main-container"}>
      <Routes>
        <Route path="/" element={<LoginBanner />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Flex>
  );
}

export default MainContainer;
