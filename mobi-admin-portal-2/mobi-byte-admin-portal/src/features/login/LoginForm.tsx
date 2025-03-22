// import { useQuery } from "@tanstack/react-query";
import {
  Checkbox,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateInput } from "../../components/forms/formData/validateUtils";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled", // component isn't re-rendered everytime you enter a character
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validate: {
      username: validateInput,
      password: validateInput,
    },
  });

  const isPending = false;

  return (
    <Stack w="300" className="fade-in">
      {/* {error && <div style={{ color: "red" }}>{error.message}</div>} */}
      <form
        onSubmit={form.onSubmit((values) => {
          console.log("Form submitted with values:");
          console.log(values);
          navigate("/dashboard");
        })}
        style={{ textAlign: "left" }}
      >
        <TextInput
          label="Username"
          placeholder="Username"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          mt="sm"
          label="Password"
          placeholder="Password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        <Checkbox
          mt="md"
          label="Remember me"
          key={form.key("remember")}
          {...form.getInputProps("remember", { type: "checkbox" })}
        />

        <Group justify="center" mt="md">
          <Button type="submit">{isPending ? "Logging in..." : "Login"}</Button>
        </Group>
      </form>
    </Stack>
  );
}

export default LoginForm;
