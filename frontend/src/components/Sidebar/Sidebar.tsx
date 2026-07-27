import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiTarget,
  FiClock,
  FiBarChart2,
  FiCpu,
  FiInfo,
} from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Detection", path: "/prediction", icon: <FiTarget /> },
  { name: "History", path: "/history", icon: <FiClock /> },
  { name: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },
  { name: "Quantum", path: "/quantum", icon: <FiCpu /> },
  { name: "About", path: "/about", icon: <FiInfo /> },
];

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col justify-between">

      <div>

        <div className="px-6 py-8 border-b border-slate-700">

          <h1 className="text-2xl font-bold">
            ⚛ Quantum Fusion
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            AI Multi-Sensor Intelligence
          </p>

        </div>

        <nav className="mt-8">

          {menuItems.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-4 transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              <span className="text-xl">{item.icon}</span>

              <span>{item.name}</span>

            </NavLink>

          ))}

        </nav>

      </div>

      <div className="border-t border-slate-700 p-6">

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-green-500"></div>

          <span className="text-sm">
            Backend Connected
          </span>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;