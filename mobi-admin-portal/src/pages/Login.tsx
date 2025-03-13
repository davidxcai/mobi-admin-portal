import LoginForm from "../components/LoginForm";
import LoginBanner from "../components/LoginBanner";

function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column align-items-center justify-content-center w-50 vh-100 bg-secondary">
        <LoginForm />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center w-50 gap-5 text-center">
        <LoginBanner />
      </div>
    </div>
  );
}

export default Login;
