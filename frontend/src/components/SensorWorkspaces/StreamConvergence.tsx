import { Atom, Cpu, Layers, Target } from "lucide-react";

interface StreamConvergenceProps {
  isAnalyzing: boolean;
  hasResult: boolean;
  activeSensors: {
    radar: boolean;
    thermal: boolean;
    acoustic: boolean;
  };
}

export function StreamConvergence({
  isAnalyzing,
  hasResult,
  activeSensors,
}: StreamConvergenceProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-cyan-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Sensor Stream Convergence Pipeline
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span
            className={`h-2 w-2 rounded-full ${
              isAnalyzing
                ? "bg-cyan-400 animate-ping"
                : hasResult
                  ? "bg-green-400"
                  : "bg-slate-500"
            }`}
          />
          <span className="text-slate-400">
            {isAnalyzing
              ? "STREAMS CONVERGING &bull; OPTIMIZING"
              : hasResult
                ? "FUSION COMPLETED &bull; DECISION VERIFIED"
                : "AWAITING SENSOR SIGNALS"}
          </span>
        </div>
      </div>

      {/* Visual Convergence Layout */}
      <div className="relative py-4 px-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
          {/* 1. Multi-Modal Signals */}
          <div className="space-y-2 p-3 rounded-2xl border border-slate-800 bg-slate-950/80">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">
              1. Multi-Modal Input Streams
            </span>
            <div className="space-y-1.5 text-xs font-semibold">
              <div
                className={`p-1.5 rounded-lg border transition ${
                  activeSensors.radar
                    ? "border-cyan-500/40 text-cyan-300 bg-cyan-950/20"
                    : "border-slate-800 text-slate-600 opacity-40"
                }`}
              >
                Radar FMCW (77GHz)
              </div>
              <div
                className={`p-1.5 rounded-lg border transition ${
                  activeSensors.thermal
                    ? "border-orange-500/40 text-orange-300 bg-orange-950/20"
                    : "border-slate-800 text-slate-600 opacity-40"
                }`}
              >
                Thermal Infrared (LWIR)
              </div>
              <div
                className={`p-1.5 rounded-lg border transition ${
                  activeSensors.acoustic
                    ? "border-violet-500/40 text-violet-300 bg-violet-950/20"
                    : "border-slate-800 text-slate-600 opacity-40"
                }`}
              >
                Acoustic Harmonics
              </div>
            </div>
          </div>

          {/* 2. Classical AI Inference */}
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-2">
            <Cpu className="h-6 w-6 text-amber-400 mx-auto" />
            <span className="text-[10px] font-mono text-slate-500 block uppercase">
              2. Classical AI Classifiers
            </span>
            <p className="text-xs font-semibold text-white">
              Independent Random Forests
            </p>
            <p className="text-[11px] text-slate-400">
              Evaluates individual probabilities &amp; sensor confidence
            </p>
          </div>

          {/* 3. BQPhy Quantum Optimization */}
          <div className="p-4 rounded-2xl border border-violet-500/40 bg-slate-950/80 space-y-2 shadow-lg shadow-violet-950/30">
            <Atom
              className={`h-6 w-6 text-violet-400 mx-auto ${
                isAnalyzing ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "3s" }}
            />
            <span className="text-[10px] font-mono text-violet-300 block uppercase font-bold">
              3. BQPhy QIEO Engine
            </span>
            <p className="text-xs font-semibold text-violet-200">
              Optimal Weight Vector
            </p>
            <p className="text-[11px] text-slate-400">
              Pop: 40 &bull; Gens: 100 &bull; Multi-objective solver
            </p>
          </div>

          {/* 4. Sensor Fusion & Decision */}
          <div className="p-4 rounded-2xl border border-cyan-500/30 bg-slate-950/80 space-y-2">
            <Target className="h-6 w-6 text-green-400 mx-auto" />
            <span className="text-[10px] font-mono text-slate-500 block uppercase">
              4. Adaptive Fusion Decision
            </span>
            <p className="text-xs font-semibold text-white">
              Weighted Certainty
            </p>
            <p className="text-[11px] text-slate-400">
              S = &Sigma; (w_i &times; p_i) &ge; 0.50 Threshold
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
