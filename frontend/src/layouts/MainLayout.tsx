import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import TopNavbar from "../components/TopNavbar/TopNavbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64">

        {/* Fixed Top Navbar */}
        <TopNavbar />

        {/* Scrollable Content */}
        <main className="min-h-screen px-8 pb-8 pt-24">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;