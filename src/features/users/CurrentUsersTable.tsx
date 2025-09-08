import { TextInput } from "@mantine/core";
import { RefreshButton } from "../../components/buttons";
import { IconSearch } from "@tabler/icons-react";
import { UsersTable } from "./UsersTable";
import { useUserProfiles } from "./UsersProvider";

export function CurrentUsersTable() {
  const members = useUserProfiles();

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <strong>{members.length} Members</strong>

        <RefreshButton cache="users" />
      </div>
      <TextInput
        leftSection={<IconSearch size={16} />}
        placeholder="Search members..."
        my="md"
      />
      <UsersTable />
    </>
  );
}
