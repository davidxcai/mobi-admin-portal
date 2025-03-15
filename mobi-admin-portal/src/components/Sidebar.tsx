import SidebarMenu from "./SidebarMenu";
import LoginForm from "./login/LoginForm";
import useUi from "../hooks/useUi";

function Sidebar() {
  // const currentPage = useSelector((state: any) => state.ui.currentPage);
  const { currentPage } = useUi();
  return currentPage === "login" ? <LoginForm /> : <SidebarMenu />;
}

export default Sidebar;
