import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <main className="ml-64 min-h-screen overflow-y-auto p-8">
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;