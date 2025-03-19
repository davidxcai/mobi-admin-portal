import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import { Flex } from "@mantine/core";
import useAuth from "../hooks/useAuth";

function Layout() {
  const { user, isAuthenticated } = useAuth();
  const isLoggedIn = user && isAuthenticated;

  return (
    <Flex align="center" className="vh-100">
      <Flex
        justify={isLoggedIn ? "" : "center"}
        align={isLoggedIn ? "" : "center"}
        className={`sidebar ${isLoggedIn ? "" : "login-page"}`}
        h="100vh"
      >
        <Sidebar />
      </Flex>
      <Flex
        direction="column"
        h="100vh"
        flex="1"
        gap="lg"
        align={isLoggedIn ? "stratch" : "center"}
        justify={isLoggedIn ? "flex-start" : "center"}
      >
        <MainContainer />
      </Flex>
    </Flex>
  );
}

export default Layout;
