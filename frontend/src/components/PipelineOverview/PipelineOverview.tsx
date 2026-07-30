import {
  Radar,
  Thermometer,
  Mic,
  BrainCircuit,
  Cpu,
  Target,
  ChevronDown,
} from "lucide-react";
import Card from "../common/Card";

const pipeline = [
  {
    title: "Radar Sensor",
    subtitle: "Radar Signal Processing",
    icon: Radar,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    title: "Thermal Sensor",
    subtitle: "Thermal Image Analysis",
    icon: Thermometer,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    title: "Acoustic Sensor",
    subtitle: "Audio Signal Processing",
    icon: Mic,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "Feature Extraction",
    subtitle: "Sensor Feature Engineering",
    icon: BrainCircuit,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "AI Classification",
    subtitle: "Individual Sensor Models",
    icon: Cpu,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    title: "Quantum Optimization",
    subtitle: "BQPhy Adaptive Fusion",
    icon: Cpu,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    title: "Drone Prediction",
    subtitle: "Final Detection",
    icon: Target,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
];

function PipelineOverview() {
  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white">
          AI Detection Pipeline
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Complete workflow from multi-sensor acquisition to Quantum-Inspired
          optimized prediction.
        </p>
      </div>

      <div className="flex flex-col items-center">
        {pipeline.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="flex w-full max-w-xl flex-col items-center"
            >
              <div
                className={`flex w-full items-center gap-5 rounded-2xl border ${step.border} ${step.bg} px-5 py-5 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl border ${step.border}`}
                >
                  <Icon className={`h-7 w-7 ${step.color}`} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {step.subtitle}
                  </p>
                </div>
              </div>

              {index !== pipeline.length - 1 && (
                <ChevronDown className="my-3 h-6 w-6 text-slate-600" />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default PipelineOverview;