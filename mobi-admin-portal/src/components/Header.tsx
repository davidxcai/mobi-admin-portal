import useAuth from "../hooks/useAuth";
import { Navbar, Container, Button } from "react-bootstrap";

const Header = () => {
  const { user, handleLogin, handleLogout } = useAuth();
  const message = user ? `Welcome, ${user}!` : "Please login";
  const handleClick = user ? handleLogout : handleLogin;

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>MOBI BYTE</Navbar.Brand>
        <span className="text-light me-2">{message}</span>
        <Button
          variant={user ? "outline-light" : "primary"}
          onClick={handleClick}
        >
          {user ? "Logout" : "Login"}
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
