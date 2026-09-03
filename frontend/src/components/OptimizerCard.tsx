import { Cpu, Atom } from "lucide-react";
import Card from "./common/Card";
import WeightDistributionChart from "./WeightDistributionChart";

interface Weight {
  name: string;
  value: number;
}

interface OptimizerCardProps {
  title: string;
  subtitle: string;
  runtime: number;
  fusionScore: number;
  confidence: number;
  weights: Weight[];
  variant: "classical" | "quantum";
}

const OptimizerCard = ({
  title,
  subtitle,
  runtime,
  fusionScore,
  confidence,
  weights,
  variant,
}: OptimizerCardProps) => {
  const Icon = variant === "quantum" ? Atom : Cpu;

  const accent =
    variant === "quantum"
      ? "text-cyan-400"
      : "text-slate-300";

  const iconBg =
    variant === "quantum"
      ? "bg-cyan-500/10"
      : "bg-slate-800";

  return (
    <Card className="h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className={`rounded-xl p-3 ${iconBg}`}>
          <Icon className={`h-6 w-6 ${accent}`} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            {title}
          </h2>

          <p className="text-sm text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Runtime
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            {runtime} ms
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Fusion
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            {fusionScore}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Confidence
          </p>

          <p className={`mt-2 text-xl font-bold ${accent}`}>
            {confidence}%
          </p>
        </div>

      </div>

      <WeightDistributionChart data={weights} />
    </Card>
  );
};

export default OptimizerCard;