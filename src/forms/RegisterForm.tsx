import {
  useForm,
  isEmail,
  isNotEmpty,
  hasLength,
  matchesField,
} from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useRegister } from "../hooks/useAuth";

export function RegisterForm() {
  const { mutate: register, isPending } = useRegister();

  const form = useForm({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      first_name: isNotEmpty("First name is required"),
      last_name: isNotEmpty("Last name is required"),
      password: hasLength(
        { min: 6 },
        "Password must be at least 6 characters long"
      ),
      confirmPassword: matchesField("password", "Passwords do not match"),
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { email, first_name, last_name, password } = form.getValues();
    register({ email, first_name, last_name, password });
    console.log(form.getValues());
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 h-full justify-center items-center p-4"
    >
      <TextInput
        placeholder="Email"
        {...form.getInputProps("email")}
        key={form.key("email")}
        autoFocus={true}
      />

      <TextInput
        placeholder="First Name"
        {...form.getInputProps("first_name")}
        key={form.key("first_name")}
      />

      <TextInput
        placeholder="Last Name"
        {...form.getInputProps("last_name")}
        key={form.key("last_name")}
      />

      <TextInput
        type="password"
        placeholder="Password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <TextInput
        type="password"
        placeholder="Confirm Password"
        key={form.key("confirmPassword")}
        {...form.getInputProps("confirmPassword")}
      />

      <Button
        type="submit"
        variant="filled"
        loading={isPending}
        loaderProps={{ type: "dots" }}
        disabled={isPending}
      >
        Register
      </Button>
    </form>
  );
}
