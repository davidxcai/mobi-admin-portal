import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function LoginForm() {
  const { handleLogin } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const {
    sendRequest: login,
    loading,
    error,
  } = useApi("login", "http://localhost:3000/auth/login", "POST");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    // console.log(formData);
    e.preventDefault();
    const response = await login(formData);

    if (response?.data) {
      handleLogin(response.data); // Store user data in Redux & update isAuthenticated
    }
  };

  return (
    <Form className="mw-md" onSubmit={handleSubmit}>
      {error && <Alert variant="danger">Error logging in</Alert>}

      <Form.Group className="mb-3" controlId="username">
        <Form.Control
          type="text"
          name="username"
          placeholder="Username"
          className="custom-input"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          className="custom-input"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="checkbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>

      <Button
        type="submit"
        className="w-100"
        variant="primary"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
}

export default LoginForm;
