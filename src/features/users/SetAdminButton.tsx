import { modals } from "@mantine/modals";
import { Button, TextInput } from "@mantine/core";
import type { Profile } from "../../types/models";
import { useProfileContext } from "../../providers/ProfileProvider";
import { useState, useEffect } from "react";
import { usePromoteAdmin, useDemoteAdmin } from "../../hooks/useAdmin";

export function SetAdminButton({ user }: { user: Profile }) {
  const isAdmin = user.is_admin;
  const openModal = () => {
    modals.open({
      title: "Promote to Admin",
      size: "sm",
      radius: "md",
      centered: true,
      withCloseButton: true,
      children: isAdmin ? (
        <DemoteAdminForm user={user} />
      ) : (
        <PromoteAdminForm user={user} />
      ),
    });
  };
  return (
    <Button onClick={openModal} size="xs">
      {isAdmin ? "Demote from Admin" : "Promote to Admin"}
    </Button>
  );
}

function PromoteAdminForm({ user }: { user: Profile }) {
  const promoteAdmin = usePromoteAdmin();
  const admin = useProfileContext();
  const adminName = `${admin.first_name} ${admin.last_name}`;
  const userName = `${user.first_name} ${user.last_name}`;
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validateInput = (event: any) => {
    setInput(event.target.value);
    setIsValid(event.target.value === adminName);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isValid) {
      promoteAdmin.mutate(user);
    } else {
      console.error("Invalid name");
    }
  };

  useEffect(() => {
    if (promoteAdmin.isSuccess) {
      modals.closeAll();
    }
  }, [promoteAdmin.isSuccess]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p>You are about to promote {userName} to admin status.</p>
      <p>Plase type your first and last name to continue.</p>
      <TextInput
        placeholder={adminName}
        value={input}
        onChange={validateInput}
      />
      <Button type="submit" disabled={!isValid}>
        Promote
      </Button>
    </form>
  );
}

function DemoteAdminForm({ user }: { user: Profile }) {
  const demoteAdmin = useDemoteAdmin();
  const admin = useProfileContext();
  const adminName = `${admin.first_name} ${admin.last_name}`;
  const userName = `${user.first_name} ${user.last_name}`;
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validateInput = (event: any) => {
    setInput(event.target.value);
    setIsValid(event.target.value === adminName);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isValid) {
      console.log(`Demoting ${userName} to user`);
      demoteAdmin.mutate(user);
    } else {
      console.error("Invalid name");
    }
  };

  useEffect(() => {
    if (demoteAdmin.isSuccess) {
      modals.closeAll();
    }
  }, [demoteAdmin.isSuccess]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p>You are about to demote {userName} to user status.</p>
      <p>Plase type your first and last name to continue.</p>
      <TextInput
        placeholder={adminName}
        value={input}
        onChange={validateInput}
      />
      <Button type="submit" disabled={!isValid}>
        Demote
      </Button>
    </form>
  );
}
