import LoginForm from "./forms/LoginForm";

import { Flex } from "@mantine/core";

function Sidebar() {
  const currentPage = "login";
  const [width, align, justify] =
    currentPage === "login"
      ? ["50vw", "center", "center"]
      : ["230px", "flex-start", "flex-start"];
  return (
    <Flex w={width} align={align} justify={justify}>
      <LoginForm />
    </Flex>
  );
}

export default Sidebar;
