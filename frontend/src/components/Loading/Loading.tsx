import { Loader2, Atom, Cpu, CheckCircle2 } from "lucide-react";

interface LoadingProps {
  stage?: string;
  subtext?: string;
}

const STAGES = [
  "Uploading sensor data",
  "Extracting multi-modal features",
  "Running AI models (Radar, Thermal, Acoustic)",
  "Optimizing sensor fusion with BQPhy",
  "Generating final prediction",
];

export function LoadingOverlay({ stage, subtext }: LoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
            <Atom className="h-6 w-6 animate-spin" style={{ animationDuration: "3s" }} />
            <Loader2 className="absolute h-10 w-10 animate-spin text-cyan-400/30" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Quantum Inference</h3>
            <p className="text-xs text-slate-400">
              {subtext || "Running multi-sensor quantum inference pipeline..."}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {STAGES.map((s, index) => {
            const isCurrent = stage ? stage.includes(s) || s.includes(stage) : index === 2;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs transition-colors ${
                  isCurrent
                    ? "border border-cyan-500/40 bg-cyan-500/10 font-medium text-cyan-300"
                    : "text-slate-400"
                }`}
              >
                {isCurrent ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-cyan-400" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-600" />
                )}
                <span>{s}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>BQPhy Optimizer</span>
          </div>
          <span>Please wait a moment...</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlay;
