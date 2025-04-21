import { NavLink, Text } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { IconTableDashed, IconUser, IconCalendar } from "@tabler/icons-react";
import { SidebarProfile } from "./SidebarProfile";

const pages = [
  { label: "Dashboard", path: "/dashboard", icon: <IconTableDashed /> },
  { label: "Users", path: "/users", icon: <IconUser /> },
  { label: "Events", path: "/events", icon: <IconCalendar /> },
];

export default function Navlinks() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const links = pages.map((page) => {
    return (
      <NavLink
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
      <div className="p-2">
        <Text
          variant="gradient"
          gradient={{ from: "rgba(41, 176, 255, 1)", to: "#9E83FF", deg: 90 }}
          fw={700}
          size="xl"
        >
          MOBI BYTE
        </Text>
      </div>

      {links}
      <SidebarProfile />
    </>
  );
}
