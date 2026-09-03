import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Atom } from "lucide-react";
import { checkHealth } from "../../services/api";

interface PageMeta {
  title: string;
  description: string;
}

const PAGE_DETAILS: Record<string, PageMeta> = {
  "/": {
    title: "Command Center Overview",
    description: "Multi-sensor surveillance and quantum-optimized drone defense platform",
  },
  "/analysis": {
    title: "Sensor Analysis",
    description: "Ingest and validate multi-modal captures for live fusion inference",
  },
  "/prediction": {
    title: "Detection Result",
    description: "Real-time threat classification and BQPhy quantum optimization output",
  },
  "/map": {
    title: "Detection Map",
    description: "Geospatial tactical visualization of the ground sensor monitoring station",
  },
  "/fusion": {
    title: "Sensor Fusion Engine",
    description: "Multi-channel adaptive weighting and dynamic failure isolation",
  },
  "/quantum": {
    title: "Quantum AI",
    description: "Adaptive sensor weight optimization via BosonQ BQPhy QIEO solver",
  },
  "/comparison": {
    title: "Classical vs Quantum-Optimized Fusion",
    description: "Dual-path comparative evaluation between classical Monte Carlo and BQPhy",
  },
  "/analytics": {
    title: "Intelligence & Performance Analytics",
    description: "Model accuracy metrics, BQPhy score improvement, and robustness matrix",
  },
  "/failure-lab": {
    title: "Sensor Failure Lab",
    description: "Controlled experimental degradation testing with active channel toggles",
  },
  "/history": {
    title: "Detection History Archive",
    description: "Searchable audit trail of previous multi-sensor detections and reports",
  },
  "/architecture": {
    title: "System Architecture",
    description: "Interactive end-to-end multi-sensor pipeline technical specifications",
  },
  "/applications": {
    title: "Mission Applications",
    description: "Current drone defense demonstration and potential domain adaptation roadmap",
  },
  "/about": {
    title: "About Quantum Sentinel",
    description: "Core technology stack, mission objective, and design principles",
  },
};

function TopNavbar() {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    checkHealth()
      .then((res) => {
        if (mounted) setIsOnline(res.status === "healthy");
      })
      .catch(() => {
        if (mounted) setIsOnline(false);
      });

    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  const currentMeta = PAGE_DETAILS[location.pathname] || {
    title: "Quantum Sentinel",
    description: "Quantum-Optimized Multi-Sensor Intelligence",
  };

  return (
    <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {currentMeta.title}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentMeta.description}
          </p>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-3">
          {/* Backend Status Pill */}
          <div
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              isOnline === null
                ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                : isOnline
                  ? "border-green-500/20 bg-green-500/10 text-green-400"
                  : "border-red-500/20 bg-red-500/10 text-red-400"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isOnline === null
                  ? "bg-amber-400 animate-pulse"
                  : isOnline
                    ? "bg-green-400"
                    : "bg-red-400"
              }`}
            />
            <span>
              {isOnline === null
                ? "Connecting..."
                : isOnline
                  ? "Backend Connected"
                  : "Backend Offline"}
            </span>
          </div>

          {/* BQPhy Status Pill - Only green if backend confirms it */}
          <div
            className={`hidden sm:flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              isOnline
                ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                : "border-slate-800 bg-slate-900 text-slate-500"
            }`}
          >
            <Atom
              className={`h-3.5 w-3.5 ${
                isOnline ? "text-violet-400 animate-pulse" : "text-slate-500"
              }`}
            />
            <span>{isOnline ? "BQPhy Ready" : "BQPhy Offline"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;