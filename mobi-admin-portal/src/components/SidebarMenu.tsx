import useUi from "../hooks/useUi";
import useAuth from "../hooks/useAuth";
import { menuItems } from "../development/data";

function SidebarMenu() {
  const { currentPage, changePage } = useUi();
  const { handleLogout } = useAuth();
  return (
    <>
      <h4 className="space-grotesk bold m-4 fade-in gradient-text">
        MOBI BYTE
      </h4>
      {menuItems.map((page: string) => (
        <button
          key={page}
          className={`sidebar-btn px-4 py-2 fade-in ${
            currentPage === page.toLowerCase() ? "active" : ""
          }`}
          onClick={() => changePage(page.toLowerCase())}
        >
          {page}
        </button>
      ))}
      <button className="sidebar-btn px-4 py-2 fade-in" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default SidebarMenu;
