import { CurrentEventProvider } from "./context/CurrentEventContext";
import { AppShell, Burger, Group } from "@mantine/core";
import { MobiText } from "./components/MobiText";
import { MobiLogo } from "./components/MobiLogo";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Sidebar } from "./features/navbar/Sidebar";
import { Dashboard, Events, Users, Profile, Settings } from "./pages/";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { ProtectedRoutes } from "./providers/ProtectedRoutes";

export function App() {
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
            <AppShell.Main className="flex flex-col flex-1 overflow-auto">
                <CurrentEventProvider>
                    <Routes>
                        <Route path="/" element={<MobiLogo />} />
                        <Route path="/login" element={<MobiLogo />} />
                        <Route path="/register" element={<h1>Register</h1>} />
                        <Route path="*" element={<h1>404 Not Found</h1>} />

                        {/* Authenticated routes */}
                        <Route
                            element={
                                <ProtectedRoutes>
                                    <Outlet />
                                </ProtectedRoutes>
                            }
                        >
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </CurrentEventProvider>
            </AppShell.Main>
        </AppShell>
    );
}
