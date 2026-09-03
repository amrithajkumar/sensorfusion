import { useLocation, Link } from "react-router-dom";
import {
  Target,
  Activity,
  Radar,
  Thermometer,
  Mic,
  CircleCheck,
  CircleX,
  Cpu,
  Layers3,
  Gauge,
  ShieldAlert,
  Clock,
  TrendingUp,
  ArrowRight,
  Download,
  Printer,
  MapPin,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import StatusBadge from "../../components/common/StatusBadge";
import type { PredictionResponse } from "../../services/api";
import { downloadAnalysisReport, openPrintableReport } from "../../utils/reportGenerator";

type SensorConfig = {
  key: "radar" | "thermal" | "acoustic";
  label: string;
  icon: typeof Radar;
  color: string;
  probability: number;
  weight: number;
  reliability: number;
};

const formatPercent = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }
  return value <= 1 ? value * 100 : value;
};

function Prediction() {
  const location = useLocation();
  const statePrediction = location.state as PredictionResponse | undefined;

  // Fallback to latest stored prediction if visiting page directly
  const prediction: Partial<PredictionResponse> =
    statePrediction ||
    JSON.parse(localStorage.getItem("latestPrediction") || "{}");

  const hasData = Boolean(prediction.prediction);

  const probabilities = prediction.sensor_probabilities ?? {
    radar: 0,
    thermal: 0,
    acoustic: 0,
  };

  const reliability = prediction.sensor_reliability ?? {
    radar: 0,
    thermal: 0,
    acoustic: 0,
  };

  const quantum = prediction.quantum ?? {
    weights: { radar: 0, thermal: 0, acoustic: 0 },
    score: 0,
    runtime_seconds: 0,
  };

  const classical = prediction.classical ?? {
    weights: { radar: 0, thermal: 0, acoustic: 0 },
    score: 0,
    runtime_seconds: 0,
  };

  const comparison = prediction.comparison ?? {
    quantum_improvement_percent: 0,
  };

  const resultLabel = prediction.prediction ?? "No Detection Data";
  const isDetected =
    typeof prediction.detected === "boolean"
      ? prediction.detected
      : resultLabel === "Drone";

  const confidenceValue = formatPercent(prediction.confidence);

  const threatLevel = prediction.threat_level ?? "LOW";
  const missionStatus = prediction.mission_status ?? "NO THREAT";
  const recommendedAction =
    prediction.recommended_action ?? "Upload sensor captures to perform analysis";

  const analysisId = "QS-" + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toLocaleString();

  const handleDownloadReport = () => {
    downloadAnalysisReport({
      analysisId,
      timestamp,
      monitoringLocation: "Station Alpha (Perimeter Defense)",
      coordinates: { lat: 28.6139, lng: 77.209 },
      prediction,
    });
  };

  const handlePrintReport = () => {
    openPrintableReport({
      analysisId,
      timestamp,
      monitoringLocation: "Station Alpha (Perimeter Defense)",
      coordinates: { lat: 28.6139, lng: 77.209 },
      prediction,
    });
  };

  const sensors: SensorConfig[] = [
    {
      key: "radar",
      label: "Radar",
      icon: Radar,
      color: "text-cyan-400",
      probability: formatPercent(probabilities.radar),
      weight: formatPercent(quantum.weights?.radar),
      reliability: formatPercent(reliability.radar),
    },
    {
      key: "thermal",
      label: "Thermal",
      icon: Thermometer,
      color: "text-orange-400",
      probability: formatPercent(probabilities.thermal),
      weight: formatPercent(quantum.weights?.thermal),
      reliability: formatPercent(reliability.thermal),
    },
    {
      key: "acoustic",
      label: "Acoustic",
      icon: Mic,
      color: "text-violet-400",
      probability: formatPercent(probabilities.acoustic),
      weight: formatPercent(quantum.weights?.acoustic),
      reliability: formatPercent(reliability.acoustic),
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeader
          title="Detection Result"
          description="Synthesized multi-sensor target classification and BQPhy quantum optimization verification."
        />

        {hasData && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Report</span>
            </button>
            <button
              type="button"
              onClick={handlePrintReport}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print View</span>
            </button>
          </div>
        )}
      </div>

      {/* Threat Level & Mission Action Banner */}
      {hasData && (
        <div
          className={`flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${
            isDetected
              ? "border-red-500/30 bg-red-950/20 text-red-100"
              : "border-green-500/30 bg-green-950/20 text-green-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <ShieldAlert
              className={`h-7 w-7 shrink-0 ${
                isDetected ? "text-red-400" : "text-green-400"
              }`}
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                  Mission Status:
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    isDetected
                      ? "bg-red-500/20 text-red-300"
                      : "bg-green-500/20 text-green-300"
                  }`}
                >
                  {missionStatus}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    threatLevel === "CRITICAL"
                      ? "bg-red-600 text-white"
                      : threatLevel === "HIGH"
                        ? "bg-amber-600 text-white"
                        : "bg-slate-800 text-slate-300"
                  }`}
                >
                  THREAT: {threatLevel}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium">
                Action: {recommendedAction}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs opacity-80 shrink-0">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>Runtime: {(prediction.total_runtime_seconds ?? 0).toFixed(2)}s</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="h-4 w-4 text-cyan-400" />
              <span>Fusion: {(prediction.fusion_score ?? 0).toFixed(4)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Prediction & Metrics */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="space-y-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">Target Classification</h2>
            </div>
            {hasData && (
              <span className="text-xs font-mono text-slate-400">
                AI + BQPhy Quantum Fusion
              </span>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Final Classification
              </p>

              <div className="mt-4 flex items-center gap-3">
                {isDetected ? (
                  <CircleCheck className="h-7 w-7 text-green-400 shrink-0" />
                ) : (
                  <CircleX className="h-7 w-7 text-red-400 shrink-0" />
                )}

                <div>
                  <p className="text-3xl font-extrabold text-white">{resultLabel}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {isDetected
                      ? "Detection threshold met &bull; Target Identified"
                      : "No aerial threat detected in sector"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Fused Confidence
              </p>

              <div className="mt-4 flex items-center gap-3">
                <Activity className="h-7 w-7 text-cyan-400 shrink-0" />

                <div>
                  <p className="text-3xl font-extrabold text-white">
                    {confidenceValue.toFixed(1)}%
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Optimized weighted certainty
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!hasData && (
            <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center">
              <p className="text-sm text-slate-400">
                No active prediction in session memory.
              </p>
              <Link
                to="/analysis"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                <span>Upload Sensor Data to Run Analysis</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          {/* Action Links Bar */}
          {hasData && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
              <Link
                to="/map"
                className="inline-flex items-center gap-1.5 font-medium text-cyan-400 hover:underline"
              >
                <MapPin className="h-4 w-4" />
                <span>View Monitoring Location on Map</span>
              </Link>

              <Link
                to="/fusion"
                className="inline-flex items-center gap-1.5 font-medium text-slate-400 hover:text-white"
              >
                <Layers3 className="h-4 w-4" />
                <span>Inspect Sensor Fusion Topology</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </Card>

        {/* Sensor Availability & Reliability */}
        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <Layers3 className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Sensors Status</h2>
          </div>

          <div className="space-y-3">
            {sensors.map((sensor) => {
              const Icon = sensor.icon;
              const active = sensor.probability > 0 || sensor.weight > 0;

              return (
                <div
                  key={sensor.key}
                  className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${sensor.color}`} />
                      <div>
                        <p className="font-medium text-white">{sensor.label}</p>
                        <p className="text-xs text-slate-400">
                          Reliability: {sensor.reliability.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {active ? (
                      <StatusBadge status="success" text="Active" />
                    ) : (
                      <StatusBadge status="error" text="Muted" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Sensor Probabilities & BQPhy Weights */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="space-y-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gauge className="h-6 w-6 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">
                Individual Sensor Probabilities
              </h2>
            </div>
            <span className="text-xs text-slate-400">Raw AI Inference</span>
          </div>

          <div className="space-y-5">
            {sensors.map((sensor) => (
              <div key={sensor.key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300 font-medium">
                    {sensor.label} AI Output
                  </span>
                  <span className="font-semibold text-white">
                    {sensor.probability.toFixed(1)}%
                  </span>
                </div>

                <div className="h-2.5 rounded-full bg-slate-800">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      sensor.key === "radar"
                        ? "bg-cyan-400"
                        : sensor.key === "thermal"
                          ? "bg-orange-400"
                          : "bg-violet-400"
                    }`}
                    style={{
                      width: `${Math.max(0, Math.min(100, sensor.probability))}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quantum Optimization Card */}
        <Card className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="h-6 w-6 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">BQPhy Optimization</h2>
            </div>
            <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400">
              QIEO Solver
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3.5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Quantum Weights Assigned
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-slate-900 p-2">
                  <span className="text-slate-400">Radar</span>
                  <p className="font-bold text-cyan-400">
                    {formatPercent(quantum.weights?.radar).toFixed(1)}%
                  </p>
                </div>
                <div className="rounded-lg bg-slate-900 p-2">
                  <span className="text-slate-400">Thermal</span>
                  <p className="font-bold text-orange-400">
                    {formatPercent(quantum.weights?.thermal).toFixed(1)}%
                  </p>
                </div>
                <div className="rounded-lg bg-slate-900 p-2">
                  <span className="text-slate-400">Acoustic</span>
                  <p className="font-bold text-violet-400">
                    {formatPercent(quantum.weights?.acoustic).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Quantum Gain
                  </p>
                  <p className="mt-1 flex items-center gap-1 font-bold text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    +{(comparison.quantum_improvement_percent ?? 0).toFixed(2)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Runtime
                  </p>
                  <p className="mt-1 font-medium text-slate-300">
                    {((quantum.runtime_seconds ?? 0) * 1000).toFixed(0)} ms
                  </p>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px] text-slate-400">
                <span>Classical: {(classical.score ?? 0).toFixed(4)}</span>
                <span className="font-medium text-cyan-300">BQPhy: {(quantum.score ?? 0).toFixed(4)}</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                to="/quantum"
                className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300"
              >
                <span>View Full Quantum AI Analysis</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Prediction;