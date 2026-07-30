import { useLocation } from "react-router-dom";
import { Activity } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/prediction": "Detection",
  "/history": "History",
  "/analytics": "Analytics",
  "/quantum": "Quantum AI",
  "/about": "About",
};

function TopNavbar() {
  const location = useLocation();

  const currentPage = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-800 bg-slate-950/95">

      <div className="flex h-full items-center justify-between px-8">

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {currentPage}
          </h1>

          <p className="text-sm text-slate-400">
            QuantumFusion AI Drone Detection Platform
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">

          <Activity size={18} className="text-green-500" />

          <span className="text-sm font-medium text-green-400">
            Backend Connected
          </span>

        </div>

      </div>

    </header>
  );
}

export default TopNavbar;