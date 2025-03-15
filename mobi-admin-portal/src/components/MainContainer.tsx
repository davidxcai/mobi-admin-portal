import LoginBanner from "./login/LoginBanner";
import Dashboard from "../pages/Dashboard";
import Manage from "../pages/Manage";
import CardSwipe from "../pages/CardSwipe";
import Events from "../pages/Events";
import Merchandise from "../pages/Merchandise";
import Projects from "../pages/Projects";
import Settings from "../pages/Settings";
import useUi from "../hooks/useUi";

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

// function renderNav(currentPage: string) {
//   return currentPage === "login" ? null : <Nav />;
// }

function MainContainer() {
  const { currentPage } = useUi();
  console.log(currentPage); // Logs current page for debugging
  return (
    <>
      {/* {renderNav(currentPage)} */}
      <div className={currentPage === "login" ? "" : "p-5 d-flex flex-grow-1"}>
        {renderPage(currentPage)}
      </div>
    </>
  );
}

export default MainContainer;
