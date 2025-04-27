import { AppShell, NavLink } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import {
    IconChartHistogram,
    IconUsers,
    IconCalendar,
} from "@tabler/icons-react";
import { SidebarProfile } from "./SidebarProfile";
import { MobiText } from "../../components/MobiText";
import { useMediaQuery } from "@mantine/hooks";

const pages = [
    { label: "Dashboard", path: "/dashboard", icon: <IconChartHistogram /> },
    { label: "Users", path: "/users", icon: <IconUsers /> },
    { label: "Events", path: "/events", icon: <IconCalendar /> },
];

export default function Navlinks() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const links = pages.map((page) => {
        return (
            <NavLink
                className="rounded-md"
                onClick={() => navigate(page.path)}
                leftSection={page.icon}
                key={page.label}
                label={page.label}
                active={page.path === pathname}
            />
        );
    });
    return (
        <>
            {!isMobile && (
                <AppShell.Section pt="lg" px="lg">
                    <MobiText />
                </AppShell.Section>
            )}
            <AppShell.Section p="lg">{links}</AppShell.Section>

            <AppShell.Section className="mt-auto">
                <SidebarProfile />
            </AppShell.Section>
        </>
    );
}
