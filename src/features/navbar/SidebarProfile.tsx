import { Avatar, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconChevronRight,
  IconSettings,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";
import { useGetUserProfile } from "../../hooks/useProfiles";
import { useLogout } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function SidebarProfile() {
  const { data: user, isPending } = useGetUserProfile();
  const name = isPending ? "Loading" : `${user?.first_name} ${user?.last_name}`;
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  return (
    <Menu position="right-end" withArrow arrowPosition="center">
      <Menu.Target>
        <Group className="cursor-pointer" p="lg">
          <Avatar color="initials" name={name} />
          <Stack gap={0}>
            <Text fw="500">{name}</Text>
            <Text size="xs" c="dimmed">
              {user?.role === "admin" ? "Admin" : "User"}
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
          onClick={() => logout()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
