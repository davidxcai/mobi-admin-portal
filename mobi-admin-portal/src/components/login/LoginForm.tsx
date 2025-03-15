import useAuth from "../../hooks/useAuth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginForm() {
  const { handleLogin } = useAuth();
  return (
    <Form className="mw-md">
      <Form.Group className="mb-3" controlId="studentID">
        <Form.Control
          type="text"
          placeholder="Student ID"
          className="custom-input"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Control
          type="password"
          placeholder="Password"
          className="custom-input"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="checkbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <Button
        type="submit"
        className="w-100"
        variant="primary"
        onClick={handleLogin}
      >
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
