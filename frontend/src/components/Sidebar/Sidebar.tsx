import { NavLink } from "react-router-dom";
import {
  Compass,
  UploadCloud,
  Target,
  MapPin,
  Layers3,
  Atom,
  GitCompare,
  BarChart3,
  FlaskConical,
  History,
  Boxes,
  Briefcase,
  Info,
  Activity,
  ShieldAlert,
} from "lucide-react";

interface NavGroup {
  groupName: string;
  items: {
    name: string;
    path: string;
    icon: typeof Compass;
  }[];
}

const NAVIGATION_GROUPS: NavGroup[] = [
  {
    groupName: "OVERVIEW",
    items: [
      { name: "Command Center", path: "/", icon: Compass },
    ],
  },
  {
    groupName: "ANALYSIS",
    items: [
      { name: "Sensor Analysis", path: "/analysis", icon: UploadCloud },
      { name: "Detection Result", path: "/prediction", icon: Target },
      { name: "Detection Map", path: "/map", icon: MapPin },
    ],
  },
  {
    groupName: "INTELLIGENCE",
    items: [
      { name: "Sensor Fusion", path: "/fusion", icon: Layers3 },
      { name: "Quantum AI", path: "/quantum", icon: Atom },
      { name: "Classical vs Quantum", path: "/comparison", icon: GitCompare },
      { name: "Analytics", path: "/analytics", icon: BarChart3 },
      { name: "Sensor Failure Lab", path: "/failure-lab", icon: FlaskConical },
    ],
  },
  {
    groupName: "HISTORY",
    items: [
      { name: "Detection History", path: "/history", icon: History },
    ],
  },
  {
    groupName: "SYSTEM",
    items: [
      { name: "Architecture", path: "/architecture", icon: Boxes },
      { name: "Applications", path: "/applications", icon: Briefcase },
      { name: "About", path: "/about", icon: Info },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-800/80 bg-slate-950">
      {/* Brand Header */}
      <div className="border-b border-slate-800/80 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 shadow-sm shadow-cyan-500/20">
            <ShieldAlert className="h-5 w-5 text-cyan-400" />
          </div>

          <div className="min-w-0">
            <h1 className="text-sm font-black tracking-wider text-white uppercase truncate">
              QUANTUM SENTINEL
            </h1>
            <p className="text-[10px] text-cyan-300/80 font-medium tracking-tight truncate">
              Multi-Sensor Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-3.5 py-4 scrollbar-thin scrollbar-thumb-slate-800">
        {NAVIGATION_GROUPS.map((group) => (
          <div key={group.groupName} className="space-y-1">
            <h3 className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              {group.groupName}
            </h3>

            <div className="space-y-0.5 pt-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? "border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-semibold shadow-sm"
                          : "border border-transparent text-slate-400 hover:border-slate-800 hover:bg-slate-900/60 hover:text-slate-200"
                      }`
                    }
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Status Pill */}
      <div className="border-t border-slate-800/80 p-3.5 bg-slate-950/80">
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-[11px]">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-green-400" />
            <span className="text-slate-300 font-medium">BQPhy Solver</span>
          </div>

          <span className="rounded-md bg-green-500/10 px-1.5 py-0.5 text-[10px] font-bold text-green-400 font-mono">
            READY
          </span>
        </div>

        <p className="mt-2 text-center text-[10px] text-slate-600 font-mono">
          QUANTUM SENTINEL v2.0
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;