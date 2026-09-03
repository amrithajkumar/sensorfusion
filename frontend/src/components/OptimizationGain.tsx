import { ArrowDown, ArrowUp } from "lucide-react";
import Card from "./common/Card";

interface OptimizationGainProps {
  runtime: number;
  fusion: number;
  confidence: number;
}

const OptimizationGain = ({
  runtime,
  fusion,
  confidence,
}: OptimizationGainProps) => {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-white">
        Optimization Improvement
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-6 text-center">
          <ArrowDown className="mx-auto mb-3 h-8 w-8 text-green-400" />

          <p className="text-sm text-slate-400">
            Runtime Reduced
          </p>

          <p className="mt-2 text-3xl font-bold text-green-400">
            {runtime}%
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-6 text-center">
          <ArrowUp className="mx-auto mb-3 h-8 w-8 text-cyan-400" />

          <p className="text-sm text-slate-400">
            Fusion Score
          </p>

          <p className="mt-2 text-3xl font-bold text-cyan-400">
            +{fusion}%
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-6 text-center">
          <ArrowUp className="mx-auto mb-3 h-8 w-8 text-purple-400" />

          <p className="text-sm text-slate-400">
            Confidence
          </p>

          <p className="mt-2 text-3xl font-bold text-purple-400">
            +{confidence}%
          </p>
        </div>

      </div>
    </Card>
  );
};

export default OptimizationGain;