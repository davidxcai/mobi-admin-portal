import { useForm, SubmitHandler } from "react-hook-form";
import { TextInput, Button } from "@mantine/core";

type FormType = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
};

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-center items-center"
    >
      <TextInput
        {...register("username", { required: true })}
        placeholder="Username"
        autoFocus={true}
        error={errors.username && "This field is required"}
      />

      <TextInput
        {...register("email", { required: true })}
        placeholder="Email"
        error={errors.email && "This field is required"}
      />

      <TextInput
        {...register("first_name", { required: true })}
        placeholder="First Name"
        error={errors.first_name && "This field is required"}
      />

      <TextInput
        {...register("last_name", { required: true })}
        placeholder="Last Name"
        error={errors.last_name && "This field is required"}
      />

      <TextInput
        type="password"
        {...register("password", { required: true })}
        placeholder="Password"
        error={errors.password && "This field is required"}
      />

      <TextInput
        type="password"
        {...register("confirmPassword", { required: true })}
        placeholder="Confirm Password"
        error={errors.confirmPassword && "This field is required"}
      />

      <Button type="submit" variant="filled">
        Register
      </Button>
    </form>
  );
}
