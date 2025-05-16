import { MobiText } from "../../../components/MobiText";
import { AppShell, Burger, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Sidebar } from "./Sidebar";

type NavbarProps = {
  opened: boolean;
  toggle: () => void;
};

export function Navbar({ opened, toggle }: NavbarProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {isMobile && (
        <AppShell.Header>
          <Group h="100%" px="lg">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <MobiText />
          </Group>
        </AppShell.Header>
      )}
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>
      ;
    </>
  );
}
