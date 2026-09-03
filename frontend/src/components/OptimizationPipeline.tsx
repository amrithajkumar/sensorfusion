import {
  Radar,
  Thermometer,
  Mic,
  Cpu,
  Atom,
  ChevronDown,
} from "lucide-react";

const steps = [
  {
    icon: Radar,
    title: "Radar",
    color: "text-cyan-400",
  },
  {
    icon: Thermometer,
    title: "Thermal",
    color: "text-orange-400",
  },
  {
    icon: Mic,
    title: "Acoustic",
    color: "text-purple-400",
  },
  {
    icon: Cpu,
    title: "Feature Extraction",
    color: "text-slate-300",
  },
  {
    icon: Atom,
    title: "Quantum Optimization",
    color: "text-emerald-400",
  },
];

const OptimizationPipeline = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
      <h2 className="mb-8 text-xl font-semibold text-white">
        Optimization Pipeline
      </h2>

      <div className="flex flex-col items-center">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="flex flex-col items-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950">
                <Icon className={`h-8 w-8 ${step.color}`} />
              </div>

              <p className="mt-3 text-sm font-medium text-slate-300">
                {step.title}
              </p>

              {index !== steps.length - 1 && (
                <ChevronDown className="my-4 h-6 w-6 text-slate-600" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptimizationPipeline;