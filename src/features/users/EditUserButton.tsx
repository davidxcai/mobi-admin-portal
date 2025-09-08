import {
  ActionIcon,
  Button,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { modals } from "@mantine/modals";
import type { Profile } from "../../types/models";
import { useUpdateProfile } from "../../hooks";
import { useEffect } from "react";
import { IconEdit } from "@tabler/icons-react";

export function EditUserButton({ user }: { user: Profile }) {
  const openModal = () => {
    modals.open({
      title: "Edit User",
      size: "sm",
      radius: "md",
      centered: true,
      withCloseButton: true,
      children: <EditUserForm user={user} />,
    });
  };
  return (
    <ActionIcon onClick={openModal} variant="outline" size="sm">
      <IconEdit size={16} />
    </ActionIcon>
  );
}

function EditUserForm({ user }: { user: Profile }) {
  const updateProfile = useUpdateProfile();
  const form = useForm({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      account_status: user.account_status,
      momocoins: user.momocoins,
    },

    validate: {
      first_name: isNotEmpty("First name cannot be empty"),
      last_name: isNotEmpty("Last name cannot be empty"),
      username: isNotEmpty("Username cannot be empty"),
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (form.validate().hasErrors) {
      console.log("Form validation failed");
      return;
    }
    const updatedProfile = {
      ...user,
      ...form.getValues(),
    };
    updateProfile.mutate(updatedProfile);
    console.log("form submitted", form.getValues());
  };

  useEffect(() => {
    if (updateProfile.isSuccess) {
      modals.closeAll();
      updateProfile.reset();
    }
  }, [updateProfile.isSuccess]);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="First Name"
        placeholder="Enter first name"
        {...form.getInputProps("first_name")}
      />
      <TextInput
        label="Last Name"
        placeholder="Enter last name"
        {...form.getInputProps("last_name")}
      />
      <TextInput
        label="Username"
        placeholder="Enter username"
        {...form.getInputProps("username")}
      />
      <Select
        label="Account Status"
        placeholder="Select account status"
        defaultValue={form.getValues().account_status}
        value={form.getValues().account_status}
        data={["pending", "active", "inactive", "banned"]}
        {...form.getInputProps("account_status")}
      />
      <NumberInput
        label="Momocoins"
        placeholder="Enter number of momocoins"
        {...form.getInputProps("momocoins")}
      />
      <div>
        <Button
          type="submit"
          loading={updateProfile.isPending}
          loaderProps={{ type: "dots" }}
        >
          Update
        </Button>
      </div>
    </form>
  );
}
