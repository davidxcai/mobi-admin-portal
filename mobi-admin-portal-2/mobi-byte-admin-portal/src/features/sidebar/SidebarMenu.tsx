import { Link } from "react-router-dom";
import { useState } from "react";
import { Flex } from "@mantine/core";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Events", path: "/events" },
  { name: "Manage", path: "/manage" },
  { name: "Merchandise", path: "/merchandise" },
  { name: "Projects", path: "/projects" },
  { name: "Settings", path: "/settings" },
];

function SidebarMenu() {
  const [active, setActive] = useState("Dashboard");
  const links = menuItems.map((item) => {
    return (
      <Link
        to={item.path}
        key={item.name}
        data-active={item.name === active || undefined}
        onClick={() => {
          setActive(item.name);
        }}
        className={`sidebar-btn ${item.name === active ? "active" : ""}`}
      >
        {item.name}
      </Link>
    );
  });
  return (
    <Flex
      className="fade-in"
      direction="column"
      align="start"
      w="100%"
      h="100%"
    >
      <h1 className=" bold">MOBI BYTE</h1>
      {links}
      <Link to="/" className="sidebar-btn">
        Logout
      </Link>
    </Flex>
  );
}

export default SidebarMenu;
