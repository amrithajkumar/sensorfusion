import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Atom,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Sliders,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import type { PredictionResponse } from "../../services/api";

function Quantum() {
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

  const probabilities = prediction.sensor_probabilities || {
    radar: 0.06,
    thermal: 0.125,
    acoustic: 0.998,
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <SectionHeader
        title="Quantum AI"
        description="Adaptive Sensor Weight Optimization powered by BosonQ BQPhy Quantum-Inspired Evolutionary Optimization (QIEO)."
      />

      {/* Main Quantum Architecture Flow Visualization */}
      <Card className="border-slate-800 bg-slate-900/40 p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              OPTIMIZATION ENGINE TOPOLOGY
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Hybrid Classical-Quantum Fusion Pipeline
            </h3>
          </div>
          <span className="rounded-full bg-violet-500/20 px-3.5 py-1 text-xs text-violet-300 font-mono border border-violet-500/30">
            BosonQ QuantumNow Suite
          </span>
        </div>

        {/* Dynamic Topology Container */}
        <div className="py-6 px-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Sensor Confidence Evidence */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                1. Input Sensor Evidence (P_i)
              </span>

              <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-3 text-xs flex justify-between items-center">
                <span className="text-cyan-300 font-medium">Radar Confidence</span>
                <span className="font-mono font-bold text-white">
                  {((probabilities.radar ?? 0) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="rounded-xl border border-orange-500/30 bg-slate-950 p-3 text-xs flex justify-between items-center">
                <span className="text-orange-300 font-medium">Thermal Confidence</span>
                <span className="font-mono font-bold text-white">
                  {((probabilities.thermal ?? 0) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="rounded-xl border border-violet-500/30 bg-slate-950 p-3 text-xs flex justify-between items-center">
                <span className="text-violet-300 font-medium">Acoustic Confidence</span>
                <span className="font-mono font-bold text-white">
                  {((probabilities.acoustic ?? 0) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Middle: Central BQPhy Optimization Engine */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 text-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-500/50 bg-slate-950 shadow-2xl shadow-violet-950/80">
                <Atom className="h-12 w-12 text-violet-400 animate-spin" style={{ animationDuration: "12s" }} />
              </div>
              <h4 className="mt-3 text-base font-bold text-white">
                BQPhy QuantumNow
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Quantum-Inspired Evolutionary Optimizer (QIEO)
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-violet-300 bg-violet-950/40 px-3 py-1 rounded-full border border-violet-500/30">
                <span>Pop: 40 &bull; Gens: 100</span>
              </div>
            </div>

            {/* Right: Optimized Weights Vector */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                2. Output Optimal Weights (W_i)
              </span>

              <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-3 text-xs flex justify-between items-center">
                <span className="text-cyan-300 font-medium">Radar Assigned Weight</span>
                <span className="font-mono font-bold text-cyan-300">
                  {((quantum.weights?.radar ?? 0) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="rounded-xl border border-orange-500/30 bg-slate-950 p-3 text-xs flex justify-between items-center">
                <span className="text-orange-300 font-medium">Thermal Assigned Weight</span>
                <span className="font-mono font-bold text-orange-300">
                  {((quantum.weights?.thermal ?? 0) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="rounded-xl border border-violet-500/30 bg-slate-950 p-3 text-xs flex justify-between items-center">
                <span className="text-violet-300 font-medium">Acoustic Assigned Weight</span>
                <span className="font-mono font-bold text-violet-300">
                  {((quantum.weights?.acoustic ?? 0) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Mathematical Flow */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-4 border-t border-slate-800 text-center text-xs">
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-slate-500 block text-[10px]">STEP 1</span>
            <span className="font-semibold text-slate-300">Sensor Evidence</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-slate-500 block text-[10px]">STEP 2</span>
            <span className="font-semibold text-slate-300">Weight Boundary</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950 border border-violet-500/40 text-violet-300 font-bold">
            <span className="text-violet-400 block text-[10px]">STEP 3</span>
            <span>BQPhy QIEO</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-slate-500 block text-[10px]">STEP 4</span>
            <span className="font-semibold text-slate-300">Optimal Weights</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-slate-500 block text-[10px]">STEP 5</span>
            <span className="font-semibold text-slate-300">Sensor Fusion</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950 border border-green-500/40 text-green-300 font-bold">
            <span className="text-green-400 block text-[10px]">STEP 6</span>
            <span>Target Decision</span>
          </div>
        </div>
      </Card>

      {/* WHY QUANTUM OPTIMIZATION? */}
      <Card className="border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">
            Why Quantum Optimization?
          </h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          &ldquo;Classical AI evaluates evidence from each sensing modality. Quantum optimization is used to determine how the sensor evidence should be weighted during fusion under the defined optimization constraints.&rdquo;
        </p>

        <div className="grid gap-4 md:grid-cols-3 pt-2 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span className="font-bold text-cyan-400 uppercase tracking-wider block">
              Continuous Multi-Objective
            </span>
            <p className="text-slate-400 leading-relaxed">
              Finding weights is not a trivial average. The objective function penalizes high variance between sensors when one sensor reports noise, but rewards consensus when agreement exists.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span className="font-bold text-violet-400 uppercase tracking-wider block">
              Quantum-Inspired Acceleration
            </span>
            <p className="text-slate-400 leading-relaxed">
              BosonQ&rsquo;s QIEO algorithm avoids getting trapped in classical local minima by utilizing quantum state representation and superposition-inspired mutation operations.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span className="font-bold text-green-400 uppercase tracking-wider block">
              Hybrid Deployment
            </span>
            <p className="text-slate-400 leading-relaxed">
              Quantum does not replace the machine learning classifiers. The system uses classical Random Forest models for high-throughput feature inference, and BQPhy for optimal fusion weighting.
            </p>
          </div>
        </div>
      </Card>

      {/* Live Solver Parameters and Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-violet-400" />
              <h3 className="font-semibold text-white text-sm">
                BQPhy Solver Configuration
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">v26.03.00</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Algorithm</span>
              <span className="font-mono font-semibold text-white">Quantum-Inspired Evolutionary (QIEO)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Design Variables</span>
              <span className="font-mono font-semibold text-white">3 (Radar, Thermal, Acoustic)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Population Size</span>
              <span className="font-mono font-semibold text-white">40 individuals</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Max Generations</span>
              <span className="font-mono font-semibold text-white">100 iterations</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Constraint</span>
              <span className="font-mono font-semibold text-white">&Sigma; w_i = 1.0, w_i &ge; 0</span>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-white text-sm">
                Live Optimization Performance
              </h3>
            </div>
            <span className="text-xs text-green-400 font-mono">
              +{(comparison.quantum_improvement_percent ?? 0).toFixed(2)}% Gain
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="text-slate-500">Quantum Score</span>
              <p className="text-xl font-bold text-cyan-300 mt-1">
                {(quantum.score ?? 0).toFixed(4)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="text-slate-500">Classical Baseline</span>
              <p className="text-xl font-bold text-slate-300 mt-1">
                {(classical.score ?? 0).toFixed(4)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="text-slate-500">Quantum Solver Time</span>
              <p className="text-lg font-bold text-white mt-1">
                {((quantum.runtime_seconds ?? 0) * 1000).toFixed(1)} ms
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="text-slate-500">Classical Solver Time</span>
              <p className="text-lg font-bold text-white mt-1">
                {((classical.runtime_seconds ?? 0) * 1000).toFixed(1)} ms
              </p>
            </div>
          </div>

          <div className="pt-2 text-right">
            <Link
              to="/comparison"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>Inspect Full Classical vs Quantum Benchmark</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Quantum;