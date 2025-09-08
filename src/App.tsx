import { MobiLogo } from "./components/MobiLogo";
import { Dashboard, Events, Users, Profile, Settings } from "./pages/";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./providers/ProtectedRoutes";
import { AuthRoutes } from "./providers/AuthRoutes";

import { AuthProvider } from "./providers/AuthProvider";

export function App() {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 270,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            transitionDuration={300}
            transitionTimingFunction="ease"
            padding="lg"
        >
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
            <AppShell.Navbar>
                <Sidebar />
            </AppShell.Navbar>
            <AppShell.Main>
                <CurrentEventProvider>
                    <Routes>
                        <Route path="/" element={<MobiLogo />} />
                        <Route path="/login" element={<MobiLogo />} />
                        <Route path="/register" element={<h1>Register</h1>} />
                        <Route path="*" element={<h1>404 Not Found</h1>} />

                        {/* Authenticated routes */}
                        <Route
                            element={
                                <AuthProvider>
                                    <Outlet />
                                </AuthProvider>
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
