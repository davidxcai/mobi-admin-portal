import { Avatar, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconChevronRight,
  IconSettings,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";
import { useLogout } from "../../../hooks/";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../../providers/ProfileProvider";

export function SidebarProfile() {
  const profile = useProfileContext();
  const name = `${profile.first_name} ${profile.last_name}`;

  return (
    <Menu position="right-end" withArrow arrowPosition="center">
      <Menu.Target>
        <Group className="cursor-pointer" p="lg">
          <Avatar color="initials" name={name} />
          <Stack gap={0}>
            <Text fw="500">{name}</Text>
            <Text size="xs" c="dimmed">
              {profile.role === "admin" ? "Admin" : "User"}
            </Text>
          </Stack>
          <IconChevronRight className="ml-auto" />
        </Group>
      </Menu.Target>
      <SidebarProfileMenu />
    </Menu>
  );
}

function SidebarProfileMenu() {
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  return (
    <Menu.Dropdown>
      <Menu.Item
        leftSection={<IconUser size={14} />}
        onClick={() => navigate("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        leftSection={<IconSettings size={14} />}
        onClick={() => navigate("/settings")}
      >
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        leftSection={<IconLogout size={14} />}
        color="red"
        onClick={() => logout()}
      >
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  );
}
