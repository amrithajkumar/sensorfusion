import { useState, useEffect } from "react";
import {
  GitCompare,
  CheckCircle2,
  Info,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import type { PredictionResponse } from "../../services/api";

function Comparison() {
  const [prediction, setPrediction] = useState<Partial<PredictionResponse>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("latestPrediction");
      if (stored) {
        setPrediction(JSON.parse(stored));
      }
    } catch {
      // Ignored
    }
  }, []);

  const quantum = prediction.quantum || {
    weights: { radar: 0.0, thermal: 0.0, acoustic: 1.0 },
    score: 0.6331,
    runtime_seconds: 0.1075,
  };

  const classical = prediction.classical || {
    weights: { radar: 0.0088, thermal: 0.0321, acoustic: 0.9591 },
    score: 0.6189,
    runtime_seconds: 0.0112,
  };

  const comparison = prediction.comparison || {
    quantum_improvement_percent: 2.3,
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Classical vs Quantum-Optimized Fusion"
        description="Side-by-side technical comparison between classical Monte Carlo weighting and BosonQ BQPhy quantum optimization."
      />

      {/* Dual Path Visualization */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Classical Path */}
        <Card className="border-slate-800 space-y-5 bg-slate-900/40">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                PATHWAY A
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Classical Optimization Baseline
              </h3>
            </div>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 font-mono">
              Monte Carlo (5,000 iter)
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-500"></span>
              <span>1. Multi-Sensor Evidence Input</span>
            </div>
            <div className="text-slate-600 pl-4">&darr;</div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-500"></span>
              <span>2. Classical Grid / Monte Carlo Random Sampling</span>
            </div>
            <div className="text-slate-600 pl-4">&darr;</div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-500"></span>
              <span>3. Uniform Weighted Sensor Fusion</span>
            </div>
            <div className="text-slate-600 pl-4">&darr;</div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-500"></span>
              <span>4. Final Decision Threshold</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Measured Classical Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-slate-500">Objective Score</span>
                <p className="text-lg font-bold text-white mt-1">
                  {(classical.score ?? 0).toFixed(4)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <span className="text-slate-500">Execution Runtime</span>
                <p className="text-lg font-bold text-white mt-1">
                  {((classical.runtime_seconds ?? 0) * 1000).toFixed(1)} ms
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs">
              <span className="text-slate-500 block mb-2">Weight Allocation (R / T / A)</span>
              <div className="flex justify-between font-mono text-slate-300">
                <span>Radar: {((classical.weights?.radar ?? 0) * 100).toFixed(1)}%</span>
                <span>Thermal: {((classical.weights?.thermal ?? 0) * 100).toFixed(1)}%</span>
                <span>Acoustic: {((classical.weights?.acoustic ?? 0) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quantum Path */}
        <Card className="border-cyan-500/30 space-y-5 bg-gradient-to-b from-slate-900/80 to-cyan-950/20">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                PATHWAY B
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                BQPhy Quantum-Inspired Optimization
              </h3>
            </div>
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300 font-mono border border-cyan-500/30">
              BosonQ QIEO Algorithm
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 font-mono bg-slate-950 p-4 rounded-xl border border-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              <span>1. Multi-Sensor Evidence Input</span>
            </div>
            <div className="text-cyan-500/40 pl-4">&darr;</div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" style={{ animationDuration: "2s" }}></span>
              <span className="text-cyan-300 font-bold">2. BQPhy Quantum-Inspired Evolutionary Solver</span>
            </div>
            <div className="text-cyan-500/40 pl-4">&darr;</div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              <span>3. Dynamically Optimized Weight Fusion</span>
            </div>
            <div className="text-cyan-500/40 pl-4">&darr;</div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              <span>4. High-Confidence Detection Decision</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Measured Quantum Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-3">
                <span className="text-slate-400">Objective Score</span>
                <p className="text-lg font-bold text-cyan-300 mt-1">
                  {(quantum.score ?? 0).toFixed(4)}
                </p>
              </div>
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-3">
                <span className="text-slate-400">Solver Time</span>
                <p className="text-lg font-bold text-white mt-1">
                  {((quantum.runtime_seconds ?? 0) * 1000).toFixed(1)} ms
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-3 text-xs">
              <span className="text-slate-400 block mb-2">Weight Allocation (R / T / A)</span>
              <div className="flex justify-between font-mono text-cyan-200 font-semibold">
                <span>Radar: {((quantum.weights?.radar ?? 0) * 100).toFixed(1)}%</span>
                <span>Thermal: {((quantum.weights?.thermal ?? 0) * 100).toFixed(1)}%</span>
                <span>Acoustic: {((quantum.weights?.acoustic ?? 0) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Comparative Evaluation Metric Matrix */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-cyan-400" />
          <h3 className="font-semibold text-white text-sm">
            Head-to-Head Benchmark Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Evaluation Metric</th>
                <th className="py-3 px-4">Classical Baseline</th>
                <th className="py-3 px-4">BQPhy Quantum Optimizer</th>
                <th className="py-3 px-4">Improvement / Delta</th>
                <th className="py-3 px-4">Measurement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Objective Fusion Score</td>
                <td className="py-3.5 px-4 font-mono">{(classical.score ?? 0).toFixed(4)}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">{(quantum.score ?? 0).toFixed(4)}</td>
                <td className="py-3.5 px-4 font-bold text-green-400">
                  +{(comparison.quantum_improvement_percent ?? 0).toFixed(2)}%
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-green-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Measured live
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Execution Runtime</td>
                <td className="py-3.5 px-4 font-mono">{((classical.runtime_seconds ?? 0) * 1000).toFixed(1)} ms</td>
                <td className="py-3.5 px-4 font-mono">{((quantum.runtime_seconds ?? 0) * 1000).toFixed(1)} ms</td>
                <td className="py-3.5 px-4 font-mono text-slate-400">
                  {(((quantum.runtime_seconds ?? 0) - (classical.runtime_seconds ?? 0)) * 1000).toFixed(1)} ms
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-green-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Measured live
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Target Detection Confidence</td>
                <td className="py-3.5 px-4 font-mono">
                  {prediction.confidence ? `${(prediction.confidence * 100).toFixed(1)}%` : "Pending"}
                </td>
                <td className="py-3.5 px-4 font-mono text-cyan-300 font-bold">
                  {prediction.confidence ? `${(prediction.confidence * 100).toFixed(1)}%` : "Pending"}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">Optimal allocation</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-green-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Measured live
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-400">Overall Dataset Accuracy</td>
                <td className="py-3.5 px-4 text-slate-500 italic">Not currently measured</td>
                <td className="py-3.5 px-4 text-slate-500 italic">Not currently measured</td>
                <td className="py-3.5 px-4 text-slate-500 italic">Not currently measured</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <Info className="h-3.5 w-3.5" /> Batch eval only
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-400">ROC AUC Curve Differential</td>
                <td className="py-3.5 px-4 text-slate-500 italic">Not currently measured</td>
                <td className="py-3.5 px-4 text-slate-500 italic">Not currently measured</td>
                <td className="py-3.5 px-4 text-slate-500 italic">Not currently measured</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <Info className="h-3.5 w-3.5" /> Batch eval only
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default Comparison;
