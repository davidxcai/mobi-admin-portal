import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";

export default function RegistrationForm() {
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log(form.getValues());
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 h-full justify-center items-center"
    >
      <TextInput placeholder="Username" autoFocus={true} />

      <TextInput placeholder="Email" />

      <TextInput placeholder="First Name" />

      <TextInput placeholder="Last Name" />

      <TextInput type="password" placeholder="Password" />

      <TextInput type="password" placeholder="Confirm Password" />

      <Button type="submit" variant="filled">
        Register
      </Button>
    </form>
  );
}
