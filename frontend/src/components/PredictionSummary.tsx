import { ShieldAlert } from "lucide-react";
import Card from "./common/Card";

interface PredictionSummaryProps {
  label: string;
  confidence: number;
  threat: string;
}

const PredictionSummary = ({
  label,
  confidence,
  threat,
}: PredictionSummaryProps) => {
  const threatColor =
    threat === "HIGH"
      ? "text-red-400"
      : threat === "MEDIUM"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <Card>
      <div className="flex items-center gap-4 mb-6">
        <div className="rounded-xl bg-red-500/10 p-3">
          <ShieldAlert className="h-7 w-7 text-red-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Final Prediction
          </h2>

          <p className="text-sm text-slate-400">
            Optimized Sensor Fusion Result
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Prediction
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {label}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Confidence
          </p>

          <p className="mt-2 text-2xl font-bold text-cyan-400">
            {confidence}%
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Threat Level
          </p>

          <p className={`mt-2 text-2xl font-bold ${threatColor}`}>
            {threat}
          </p>
        </div>

      </div>
    </Card>
  );
};

export default PredictionSummary;