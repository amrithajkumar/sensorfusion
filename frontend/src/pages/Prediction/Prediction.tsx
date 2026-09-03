import { useLocation } from "react-router-dom";
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
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import StatusBadge from "../../components/common/StatusBadge";


type SensorConfig = {
  key: "radar" | "thermal" | "acoustic";
  label: string;
  icon: typeof Radar;
  color: string;
  probability: number;
  weight: number;
};

const formatPercent = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  return value <= 1 ? value * 100 : value;
};



function Prediction() {
  const location = useLocation();
  const prediction: any = location.state ?? {};

const probabilities = prediction.sensor_probabilities ?? {};

const quantum = prediction.quantum ?? {};

  const resultLabel = prediction.prediction ?? "No prediction data";
  const isDetected =
    typeof prediction.detected === "boolean"
      ? prediction.detected
      : resultLabel === "Drone";

  const confidenceValue = formatPercent(prediction.confidence);

  const sensors: SensorConfig[] = [
  {
    key: "radar",
    label: "Radar",
    icon: Radar,
    color: "text-cyan-400",
    probability: formatPercent(probabilities.radar),
    weight: formatPercent(quantum.weights?.radar),
  },
  {
    key: "thermal",
    label: "Thermal",
    icon: Thermometer,
    color: "text-orange-400",
    probability: formatPercent(probabilities.thermal),
    weight: formatPercent(quantum.weights?.thermal),
  },
  {
    key: "acoustic",
    label: "Acoustic",
    icon: Mic,
    color: "text-violet-400",
    probability: formatPercent(probabilities.acoustic),
    weight: formatPercent(quantum.weights?.acoustic),
  },
];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Prediction result"
        description="This page reads the prediction returned through  navigate('/prediction', { state: prediction }) and renders it without changing the existing flow."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="space-y-6 xl:col-span-2">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Prediction result</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Prediction
              </p>

              <div className="mt-4 flex items-center gap-3">
                {isDetected ? (
                  <CircleCheck className="h-7 w-7 text-green-400" />
                ) : (
                  <CircleX className="h-7 w-7 text-red-400" />
                )}

                <div>
                  <p className="text-3xl font-semibold text-white">{resultLabel}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {isDetected ? "Detection threshold met" : "Detection threshold not met"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Confidence
              </p>

              <div className="mt-4 flex items-center gap-3">
                <Activity className="h-7 w-7 text-cyan-400" />

                <div>
                  <p className="text-3xl font-semibold text-white">
                    {confidenceValue.toFixed(1)}%
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Backend confidence value
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <Layers3 className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Sensor availability</h2>
          </div>

          <div className="space-y-4">
            {sensors.map((sensor) => {
              const Icon = sensor.icon;
              const available = sensor.probability > 0;

              return (
                <div key={sensor.key} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${sensor.color}`} />

                      <div>
                        <p className="font-medium text-white">{sensor.label}</p>
                        <p className="text-sm text-slate-400">Reported by backend</p>
                      </div>
                    </div>

                    {available ? (
                      <StatusBadge status="success" text="Included" />
                    ) : (
                      <StatusBadge status="error" text="Missing" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="space-y-5 xl:col-span-2">
          <div className="flex items-center gap-3">
            <Gauge className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Sensor contribution</h2>
          </div>

          <div className="space-y-5">
            {sensors.map((sensor) => (
              <div key={sensor.key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{sensor.label}</span>
                  <span className="font-medium text-white">
                    {sensor.probability.toFixed(1)}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className={`h-2 rounded-full ${
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

        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Quantum optimization</h2>
          </div>

          <div className="space-y-4 text-sm">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Optimizer
              </p>
              <p className="mt-2 font-medium text-white">
                BQPhy Quantum-Inspired Optimization
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Fusion strategy
              </p>
              <p className="mt-2 font-medium text-white">Adaptive Weighted Fusion</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Optimization status
              </p>
              <div className="mt-2 flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-green-400" />
                <span className="font-medium text-green-300">Completed</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Prediction;