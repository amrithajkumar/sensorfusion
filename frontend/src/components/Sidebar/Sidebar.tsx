import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Radar,
  History,
  BarChart3,
  Cpu,
  Info,
  Atom,
  Activity,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Detection", path: "/prediction", icon: Radar },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "History", path: "/history", icon: History },
  { name: "Quantum AI", path: "/quantum", icon: Cpu },
  { name: "About", path: "/about", icon: Info },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-7">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
            <Atom className="h-6 w-6 text-cyan-400" />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-white">
              QuantumFusion
            </h1>

            <p className="text-xs text-slate-400">
              AI Surveillance
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
                    : "border border-transparent text-slate-400 hover:border-slate-800 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-5">

        <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">

          <div className="flex items-center gap-2">
            <Activity size={16} className="text-green-400" />
            <span className="text-sm text-slate-300">
              Backend
            </span>
          </div>

          <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
            Online
          </span>

        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          QuantumFusion v1.0
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;