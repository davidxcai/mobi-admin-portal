import Sidebar from "../features/sidebar/Sidebar";
import MainContainer from "./MainContainer";
import { Flex } from "@mantine/core";

function Layout() {
  return (
    <Flex style={{ height: "100vh" }}>
      <Sidebar />
      <MainContainer />
    </Flex>
  );
}

export default Layout;
