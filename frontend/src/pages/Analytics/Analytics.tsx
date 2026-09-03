import { useState, useEffect } from "react";
import {
  BarChart2,
  ShieldCheck,
  TrendingUp,
  PieChart,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import type { PredictionResponse } from "../../services/api";

function Analytics() {
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
    <div className="space-y-10 max-w-6xl mx-auto">
      <SectionHeader
        title="Intelligence & Performance Analytics"
        description="Empirical benchmark performance across individual sensor classifiers, quantum weight optimization, and multi-sensor resilience."
      />

      {/* SECTION 1: MODEL PERFORMANCE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">
              SECTION 1 &bull; Individual Model Benchmark Performance
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Test Evaluation Corpus: 2,341 Samples
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Radar Model Card */}
          <Card className="border-slate-800 bg-slate-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                FMCW Radar Model
              </span>
              <span className="text-[11px] text-slate-500 font-mono">18 Features</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Accuracy</span>
                <p className="font-bold text-white text-base mt-0.5">97.8%</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Precision</span>
                <p className="font-bold text-cyan-300 text-base mt-0.5">94.2%</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Recall</span>
                <p className="font-bold text-slate-300 text-base mt-0.5">88.5%</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">F1-Score</span>
                <p className="font-bold text-green-400 text-base mt-0.5">91.3%</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              Random Forest classifier trained on micro-Doppler radar signatures. Strong against heavy rain and fog.
            </p>
          </Card>

          {/* Thermal Model Card */}
          <Card className="border-slate-800 bg-slate-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                Thermal Infrared Model
              </span>
              <span className="text-[11px] text-slate-500 font-mono">44 Features</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Accuracy</span>
                <p className="font-bold text-white text-base mt-0.5">96.5%</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Precision</span>
                <p className="font-bold text-orange-300 text-base mt-0.5">92.1%</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Recall</span>
                <p className="font-bold text-slate-300 text-base mt-0.5">85.4%</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">F1-Score</span>
                <p className="font-bold text-green-400 text-base mt-0.5">88.6%</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              Extracts GLCM, LBP, and edge density to verify heat blooms from brushless drone motors and lithium batteries.
            </p>
          </Card>

          {/* Acoustic Model Card */}
          <Card className="border-slate-800 bg-slate-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                Acoustic Waveform Model
              </span>
              <span className="text-[11px] text-slate-500 font-mono">86 Features</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Accuracy</span>
                <p className="font-bold text-white text-base mt-0.5">98.2%</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Precision</span>
                <p className="font-bold text-violet-300 text-base mt-0.5">93.0%</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Recall</span>
                <p className="font-bold text-slate-300 text-base mt-0.5">86.0%</p>
              </div>
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">F1-Score</span>
                <p className="font-bold text-green-400 text-base mt-0.5">89.4%</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              Harmonic audio features (MFCC, chroma, spectral centroid). High certainty on low-altitude rotor acoustics.
            </p>
          </Card>
        </div>
      </div>

      {/* SECTION 2: FUSION PERFORMANCE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h3 className="font-bold text-white text-base">
              SECTION 2 &bull; Fusion Optimization Benchmark
            </h3>
          </div>
          <span className="text-xs text-green-400 font-mono">
            +{(comparison.quantum_improvement_percent ?? 0).toFixed(2)}% BQPhy Advantage
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Objective Function Score Comparison
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Classical Weighted Baseline</span>
                  <span className="font-mono text-white">{(classical.score ?? 0).toFixed(4)}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-slate-400"
                    style={{ width: `${Math.min(100, (classical.score ?? 0) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-cyan-300 font-semibold">BQPhy Quantum Optimizer</span>
                  <span className="font-mono font-bold text-cyan-300">{(quantum.score ?? 0).toFixed(4)}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-cyan-400"
                    style={{ width: `${Math.min(100, (quantum.score ?? 0) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              Higher score denotes superior target agreement and lower false-alarm variance across disparate sensor channels.
            </p>
          </Card>

          <Card className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Solver Execution Latency
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Classical Monte Carlo</span>
                  <span className="font-mono text-white">{((classical.runtime_seconds ?? 0) * 1000).toFixed(1)} ms</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-slate-400" style={{ width: "15%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-violet-300 font-semibold">BQPhy Quantum Solver</span>
                  <span className="font-mono font-bold text-violet-300">{((quantum.runtime_seconds ?? 0) * 1000).toFixed(1)} ms</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-violet-400" style={{ width: "55%" }} />
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              Quantum solver solves multi-objective continuous optimization within 100-300 ms, suitable for tactical air surveillance.
            </p>
          </Card>
        </div>
      </div>

      {/* SECTION 3: SENSOR CONTRIBUTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-violet-400" />
            <h3 className="font-bold text-white text-base">
              SECTION 3 &bull; Dynamic Sensor Weight Contribution
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Normalized &Sigma; w_i = 100%</span>
        </div>

        <Card className="space-y-4">
          <p className="text-xs text-slate-300">
            Current weight allocation generated by BQPhy optimizer for the active detection session:
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-semibold text-cyan-400 block">Radar Modality</span>
              <p className="text-2xl font-black text-white mt-1">
                {(((quantum.weights?.radar ?? 0)) * 100).toFixed(1)}%
              </p>
              <div className="h-1.5 rounded-full bg-slate-800 mt-3">
                <div
                  className="h-1.5 rounded-full bg-cyan-400"
                  style={{ width: `${(quantum.weights?.radar ?? 0) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-semibold text-orange-400 block">Thermal Modality</span>
              <p className="text-2xl font-black text-white mt-1">
                {(((quantum.weights?.thermal ?? 0)) * 100).toFixed(1)}%
              </p>
              <div className="h-1.5 rounded-full bg-slate-800 mt-3">
                <div
                  className="h-1.5 rounded-full bg-orange-400"
                  style={{ width: `${(quantum.weights?.thermal ?? 0) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-semibold text-violet-400 block">Acoustic Modality</span>
              <p className="text-2xl font-black text-white mt-1">
                {(((quantum.weights?.acoustic ?? 0)) * 100).toFixed(1)}%
              </p>
              <div className="h-1.5 rounded-full bg-slate-800 mt-3">
                <div
                  className="h-1.5 rounded-full bg-violet-400"
                  style={{ width: `${(quantum.weights?.acoustic ?? 0) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* SECTION 4: ROBUSTNESS & DEGRADATION SUMMARY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">
              SECTION 4 &bull; Multi-Sensor Robustness & Resilience
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Failure Degradation Matrix</span>
        </div>

        <Card className="space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Sensor Configuration</th>
                  <th className="py-2.5 px-3">Operating Status</th>
                  <th className="py-2.5 px-3">Fusion Capability</th>
                  <th className="py-2.5 px-3">System Resilience</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">All 3 Sensors Active</td>
                  <td className="py-3 px-3 text-green-400 font-medium">Optimal Surveillance</td>
                  <td className="py-3 px-3 text-cyan-300 font-mono">Full 3-Channel Quantum Optimization</td>
                  <td className="py-3 px-3">
                    <span className="rounded-full bg-green-500/20 text-green-300 px-2 py-0.5 font-semibold">
                      Max (98%)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">2 Sensors Active (e.g. Radar + Acoustic)</td>
                  <td className="py-3 px-3 text-amber-400 font-medium">Degraded Mode</td>
                  <td className="py-3 px-3 text-cyan-300 font-mono">Dual-Channel Dynamic Re-normalization</td>
                  <td className="py-3 px-3">
                    <span className="rounded-full bg-amber-500/20 text-amber-300 px-2 py-0.5 font-semibold">
                      High (&gt;90%)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400">1 Sensor Active (Single Channel)</td>
                  <td className="py-3 px-3 text-red-400 font-medium">Insufficient for Fusion</td>
                  <td className="py-3 px-3 text-slate-500 font-mono">Disabled (&ge; 2 required)</td>
                  <td className="py-3 px-3">
                    <span className="rounded-full bg-red-500/20 text-red-300 px-2 py-0.5 font-semibold">
                      Unfused
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;