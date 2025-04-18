import { Avatar, Menu, UnstyledButton } from "@mantine/core";
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
    <div className="mt-auto border-t border-gray-500 p-4">
      <Menu position="right-end" withArrow arrowPosition="center">
        <Menu.Target>
          <UnstyledButton className="flex flex-row gap-4 w-full items-center p-4">
            <Avatar color="initials" name="David Cai" />
            <div>
              <h2 className="text-md font-semibold">David Cai</h2>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <IconChevronRight className="ml-auto" />
          </UnstyledButton>
        </Menu.Target>
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
    </div>
  );
}
