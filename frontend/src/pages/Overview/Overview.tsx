import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldAlert,
  Radio,
  Cpu,
  Atom,
  Layers,
  Target,
  ArrowRight,
} from "lucide-react";
import Card from "../../components/common/Card";
import StatusCard from "../../components/StatusCard/StatusCard";
import { checkHealth, type PredictionResponse } from "../../services/api";

function Overview() {
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [latestPrediction, setLatestPrediction] =
    useState<Partial<PredictionResponse> | null>(null);

  useEffect(() => {
    let mounted = true;
    checkHealth()
      .then((res) => {
        if (mounted) setBackendOnline(res.status === "healthy");
      })
      .catch(() => {
        if (mounted) setBackendOnline(false);
      });

    try {
      const stored = localStorage.getItem("latestPrediction");
      if (stored) {
        setLatestPrediction(JSON.parse(stored));
      }
    } catch {
      // Ignored
    }

    return () => {
      mounted = false;
    };
  }, []);

  const isDetected = latestPrediction?.detected ?? false;
  const conf =
    latestPrediction?.confidence !== undefined
      ? latestPrediction.confidence <= 1
        ? (latestPrediction.confidence * 100).toFixed(1)
        : Number(latestPrediction.confidence).toFixed(1)
      : null;

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-2">
      {/* Hero Command Header */}
      <div className="text-center space-y-4 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-400">
          <Atom className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "6s" }} />
          <span>Next-Generation Multi-Modal Defense Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          QUANTUM SENTINEL
        </h1>

        <p className="text-base sm:text-lg font-medium text-slate-300">
          Quantum-Optimized Multi-Sensor Intelligence
        </p>

        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Combines FMCW radar, infrared thermal imaging, and acoustic harmonic arrays with classical machine learning and BosonQ BQPhy Quantum-Inspired Evolutionary Optimization (QIEO) to detect low-signature stealth drones in high-clutter operational environments.
        </p>

        {/* Primary Call to Action */}
        <div className="pt-2">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/25"
          >
            <span>START NEW ANALYSIS</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Clean Visual Architecture Pipeline */}
      <Card className="border-slate-800 bg-slate-900/40 p-8">
        <div className="text-center mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            System Pipeline Architecture
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Data flow from physical sensing through classical AI and quantum weight optimization to final decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          {/* Step 1 */}
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950 p-4 text-center">
            <Radio className="h-6 w-6 text-cyan-400 mx-auto" />
            <span className="font-bold text-xs text-white block mt-2">
              RADAR &bull; ACOUSTIC &bull; THERMAL
            </span>
            <p className="text-[11px] text-slate-400 mt-1">Multi-Modal Inputs</p>
          </div>

          <div className="hidden md:flex justify-center text-slate-600">
            <ArrowRight className="h-4 w-4" />
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-amber-500/30 bg-slate-950 p-4 text-center">
            <Cpu className="h-6 w-6 text-amber-400 mx-auto" />
            <span className="font-bold text-xs text-white block mt-2">
              CLASSICAL AI MODELS
            </span>
            <p className="text-[11px] text-slate-400 mt-1">Independent Probabilities</p>
          </div>

          <div className="hidden md:flex justify-center text-slate-600">
            <ArrowRight className="h-4 w-4" />
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-violet-500/40 bg-slate-950 p-4 text-center shadow-lg shadow-violet-950/40">
            <Atom className="h-6 w-6 text-violet-400 mx-auto animate-pulse" />
            <span className="font-bold text-xs text-violet-200 block mt-2">
              BQPHY QUANTUM NOW
            </span>
            <p className="text-[11px] text-slate-400 mt-1">QIEO Weight Solver</p>
          </div>

          <div className="hidden md:flex justify-center text-slate-600">
            <ArrowRight className="h-4 w-4" />
          </div>

          {/* Step 4 */}
          <div className="rounded-2xl border border-cyan-400/30 bg-slate-950 p-4 text-center">
            <Layers className="h-6 w-6 text-cyan-300 mx-auto" />
            <span className="font-bold text-xs text-white block mt-2">
              SENSOR FUSION
            </span>
            <p className="text-[11px] text-slate-400 mt-1">Adaptive Normalization</p>
          </div>

          <div className="hidden md:flex justify-center text-slate-600">
            <ArrowRight className="h-4 w-4" />
          </div>

          {/* Step 5 */}
          <div className="rounded-2xl border border-green-500/30 bg-slate-950 p-4 text-center">
            <Target className="h-6 w-6 text-green-400 mx-auto" />
            <span className="font-bold text-xs text-white block mt-2">
              FINAL DETECTION
            </span>
            <p className="text-[11px] text-slate-400 mt-1">Threat Classification</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/architecture"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            <span>Explore Full Interactive Architecture</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Card>

      {/* System Status Row */}
      <div className="grid gap-6 sm:grid-cols-3">
        <StatusCard
          title="FastAPI Core Service"
          value={
            backendOnline === null
              ? "Connecting..."
              : backendOnline
                ? "Online & Healthy"
                : "Offline"
          }
          status={
            backendOnline === null
              ? "warning"
              : backendOnline
                ? "success"
                : "error"
          }
        />

        <StatusCard
          title="Quantum Engine"
          value={backendOnline ? "BQPhy Active" : "Waiting for API"}
          status={backendOnline ? "success" : "warning"}
        />

        <StatusCard
          title="Trained Sensor Models"
          value="3 Modalities Ready"
          status="success"
        />
      </div>

      {/* Optional Latest Analysis Summary */}
      {latestPrediction?.prediction && (
        <Card className="border-slate-800 bg-slate-900/60 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldAlert
                className={`h-6 w-6 ${isDetected ? "text-red-400" : "text-green-400"}`}
              />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Previous Analysis Result
                </span>
                <h4 className="text-lg font-bold text-white">
                  {latestPrediction.prediction} &bull; {conf}% Confidence
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Threat: {latestPrediction.threat_level || "NORMAL"} &bull; Fusion Score: {(latestPrediction.fusion_score ?? 0).toFixed(4)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/prediction"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-cyan-500/40 bg-slate-950 transition"
              >
                <span>View Full Result</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Overview;
