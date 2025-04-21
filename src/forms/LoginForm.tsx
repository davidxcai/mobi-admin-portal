import { Button, TextInput, PasswordInput } from "@mantine/core";
import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { useLogin } from "../hooks/useAuth";

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();

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
    login(credentials);
  };
  return (
    <form
      className="flex flex-col gap-4 justify-center mx-auto h-full w-full p-4"
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
      <Button
        type="submit"
        variant="filled"
        color="indigo"
        loading={isPending}
        loaderProps={{ type: "dots" }}
        disabled={isPending}
      >
        Login
      </Button>
    </form>
  );
}
