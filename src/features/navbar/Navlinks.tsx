import { NavLink } from "@mantine/core";
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
      {links}
      <div className="mt-auto">
        <SidebarProfile />
      </div>
    </>
  );
}
