import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import useAuth from "../hooks/useAuth";

// import useUi from "../hooks/useUi";

function Layout() {
  // const { currentPage } = useUi();
  const { user, isAuthenticated } = useAuth();
  const isLoggedIn =
    user && isAuthenticated
      ? ["", ""]
      : [
          "login-page align-items-center justify-content-center",
          "align-items-center justify-content-center text-center",
        ];

  return (
    <div className="d-flex align-items-center vh-100">
      <div className={`d-flex flex-column vh-100 sidebar ${isLoggedIn[0]}`}>
        <Sidebar />
      </div>
      <main
        className={`d-flex flex-column vh-100 gap-5 flex-grow-1 ${isLoggedIn[1]}`}
      >
        <MainContainer />
      </main>
    </div>
  );
}

export default Layout;
