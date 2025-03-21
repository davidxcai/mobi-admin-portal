import { Flex } from "@mantine/core";
import LoginBanner from "../features/login/LoginBanner";

function MainContainer() {
  const currentPage = "login";
  return (
    <Flex h="100vh" align="center" justify="center" w="50vw">
      {currentPage === "login" ? <LoginBanner /> : <h1>Dashboard</h1>}
    </Flex>
  );
}

export default MainContainer;
