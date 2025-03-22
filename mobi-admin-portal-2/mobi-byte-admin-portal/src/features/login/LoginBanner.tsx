import logo from "../../assets/MOBI Logo.svg";
import { Center, Stack, Title } from "@mantine/core";

function LoginBanner() {
  return (
    <Center className="fade-in">
      <Stack>
        <img src={logo} alt="Mobi Logi" />
        <Center>
          <Title order={1} className="space-grotesk bold">
            MOBI BYTE
          </Title>
        </Center>
        <Center>
          <Title order={3} className="space-grotesk">
            ADMIN PORTAL
          </Title>
        </Center>
      </Stack>
    </Center>
  );
}

export default LoginBanner;
