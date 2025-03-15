import useUi from "../hooks/useUi";
import useAuth from "../hooks/useAuth";
import { menuItems } from "../development/data";

function SidebarMenu() {
  const { currentPage, changePage } = useUi();
  const { handleLogout } = useAuth();
  return (
    <>
      <h4 className="space-grotesk bold m-4">MOBI BYTE</h4>

      {menuItems.map((page: string) => (
        <button
          key={page}
          className={`sidebar-btn px-4 py-2 ${
            currentPage === page.toLowerCase() ? "active" : ""
          }`}
          onClick={() => changePage(page.toLowerCase())}
        >
          {page}
        </button>
      ))}
      <button className="sidebar-btn px-4 py-2" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default SidebarMenu;
