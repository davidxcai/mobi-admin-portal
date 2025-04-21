import { Avatar, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconChevronRight,
  IconSettings,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export function SidebarProfile() {
  const navigate = useNavigate();
  return (
    <Menu position="right-end" withArrow arrowPosition="center">
      <Menu.Target>
        <Group className="cursor-pointer">
          <Avatar color="initials" name="David Cai" />
          <Stack gap={0}>
            <Text fw="500">David Cai</Text>
            <Text size="xs" c="dimmed">
              Admin
            </Text>
          </Stack>
          <IconChevronRight className="ml-auto" />
        </Group>
      </Menu.Target>
      {/* Dropdown menu */}
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
          onClick={() => navigate("/login")}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
