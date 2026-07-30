import {
  Target,
  Clock3,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";

import Card from "../common/Card";

function LatestPrediction() {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-white">
          Latest Detection
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Most recent prediction from the AI fusion engine.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-5">

          <Target className="mb-3 h-7 w-7 text-green-400" />

          <p className="text-sm text-slate-400">
            Prediction
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-300">
            Drone
          </h3>

        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">

          <ShieldCheck className="mb-3 h-7 w-7 text-cyan-400" />

          <p className="text-sm text-slate-400">
            Confidence
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">
            96.8%
          </h3>

        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">

          <BrainCircuit className="mb-3 h-7 w-7 text-cyan-400" />

          <p className="text-sm text-slate-400">
            Fusion Model
          </p>

          <h3 className="mt-1 font-medium text-white">
            BQPhy Adaptive Fusion
          </h3>

        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">

          <Clock3 className="mb-3 h-7 w-7 text-cyan-400" />

          <p className="text-sm text-slate-400">
            Last Scan
          </p>

          <h3 className="mt-1 font-medium text-white">
            -- : --
          </h3>

        </div>

      </div>

    </Card>
  );
}

export default LatestPrediction;