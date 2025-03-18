import LoginBanner from "./login/LoginBanner";
import Dashboard from "../pages/Dashboard";
import Manage from "../pages/Manage";
import CardSwipe from "../pages/CardSwipe";
import Events from "../pages/Events";
import Merchandise from "../pages/Merchandise";
import Projects from "../pages/Projects";
import Settings from "../pages/Settings";
import useUi from "../hooks/useUi";
import { useSelector } from "react-redux";

function renderPage(currentPage: string) {
  switch (currentPage) {
    case "login":
      return <LoginBanner />;
    case "dashboard":
      return <Dashboard />;
    case "manage":
      return <Manage />;
    case "card swipe":
      return <CardSwipe />;
    case "events":
      return <Events />;
    case "merchandise":
      return <Merchandise />;
    case "projects":
      return <Projects />;
    case "settings":
      return <Settings />;
    default:
      return <LoginBanner />;
  }
}

// function renderNav(currentPage: string, user: string) {
//   return currentPage === "login" ? null : (
//     <Navbar>
//       <Container className="d-flex justify-content-end p-3">
//         <p>Hello, {user}</p>
//       </Container>
//     </Navbar>
//   );
// }

function MainContainer() {
  const { currentPage } = useUi();
  const user = useSelector((state: any) => state.auth.user?.name.firstName);
  // console.log(currentPage); // Logs current page for debugging
  return (
    <>
      {/* {renderNav(currentPage, user)} */}
      <div
        className={
          currentPage === "login"
            ? ""
            : "p-5 d-flex flex-column flex-grow-1 fade-in"
        }
      >
        {currentPage === "login" ? null : (
          <p className="text-end fade-in">Hello, {user}</p>
        )}
        {renderPage(currentPage)}
      </div>
    </>
  );
}

export default MainContainer;
