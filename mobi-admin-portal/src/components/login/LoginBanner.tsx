import logo from "../../assets/MOBI Logo.svg";

function LoginBanner() {
  return (
    <>
      <img src={logo} alt="Mobi Logi" />
      <div>
        <h1 className="display-4 space-grotesk bold">MOBI BYTE</h1>
        <h3 className="space-grotesk">ADMIN PORTAL</h3>
      </div>
    </>
  );
}

export default LoginBanner;
