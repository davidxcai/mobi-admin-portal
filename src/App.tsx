import { CurrentEventProvider } from "./context/CurrentEventContext";
import { AppShell, Burger, Group } from "@mantine/core";
import { MobiText } from "./components/MobiText";
import { MobiLogo } from "./components/MobiLogo";
import { useDisclosure } from "@mantine/hooks";
import { Sidebar } from "./features/navbar/Sidebar";
import { Dashboard, Events, Login, Users, Profile, Settings } from "./pages/";
import { Routes, Route } from "react-router-dom";

export function App() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 270, breakpoint: "sm", collapsed: { mobile: !opened } }}
      transitionDuration={300}
      transitionTimingFunction="ease"
      padding="lg"
    >
      <AppShell.Header>
        <Group h="100%" px="lg">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <MobiText />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="lg">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <CurrentEventProvider>
          <Routes>
            <Route path="/" element={<MobiLogo />} />
            <Route path="/login" element={<MobiLogo />} />
            <Route path="/register" element={<h1>Register</h1>} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </CurrentEventProvider>
      </AppShell.Main>
    </AppShell>
  );
}
