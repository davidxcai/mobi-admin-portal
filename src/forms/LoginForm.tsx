import { Button, TextInput, PasswordInput } from "@mantine/core";
import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      password: isNotEmpty("Password is required"),
    },
  });
  const handleClick = () => {
    const credentials = form.getValues();
    console.log("Login credentials", credentials);
    // replace with hook later
    navigate("/dashboard");
  };
  return (
    <form
      className="flex flex-col gap-4 justify-center mx-auto h-full w-full"
      onSubmit={form.onSubmit(handleClick)}
    >
      <h1 className="text-2xl font-bold">Login</h1>
      <TextInput
        placeholder="Email"
        {...form.getInputProps("email")}
        key={form.key("email")}
      />
      <PasswordInput
        placeholder="Password"
        {...form.getInputProps("password")}
        key={form.key("password")}
      />
      <Button type="submit" variant="filled" color="indigo">
        Login
      </Button>
    </form>
  );
}
