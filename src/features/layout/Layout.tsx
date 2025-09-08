import { useLocation } from "react-router";
import { AppShell } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Navbar } from "./navbar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const isWideNavbarPage = ["/", "/login", "/register"].includes(
    location.pathname
  );
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <AppShell
      header={isMobile ? { height: 60 } : undefined}
      navbar={{
        width: isWideNavbarPage ? 500 : 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      transitionDuration={300}
      transitionTimingFunction="ease"
      padding="xl"
    >
      <Navbar opened={opened} toggle={toggle} />
      <AppShell.Main className="flex flex-col flex-1 overflow-auto">
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
