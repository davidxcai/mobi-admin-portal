import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };
  return (
    <form className="flex flex-col gap-4 justify-center mx-auto h-full w-90">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 p-2 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 p-2 rounded-md"
      />
      <Button onClick={handleClick} variant="outline" color="blue">
        Login
      </Button>
    </form>
  );
}
