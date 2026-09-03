import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Radar,
  Thermometer,
  Mic,
  Cpu,
  Layers3,
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import type { PredictionResponse } from "../../services/api";

function SensorFusion() {
  const [prediction, setPrediction] = useState<Partial<PredictionResponse>>({});

  // Interactive toggle to preview how the fusion engine adapts when a sensor goes offline
  const [radarActive, setRadarActive] = useState(true);
  const [thermalActive, setThermalActive] = useState(true);
  const [acousticActive, setAcousticActive] = useState(true);

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

  const rawRadarProb = prediction.sensor_probabilities?.radar ?? 0.06;
  const rawThermalProb = prediction.sensor_probabilities?.thermal ?? 0.125;
  const rawAcousticProb = prediction.sensor_probabilities?.acoustic ?? 0.998;

  const baseWeights = prediction.quantum?.weights ?? {
    radar: 0.33,
    thermal: 0.33,
    acoustic: 0.34,
  };

  // Compute dynamic re-normalized weights when toggling active sensors
  const activeSensors = [
    { key: "radar", active: radarActive, prob: rawRadarProb, weight: baseWeights.radar ?? 0.33 },
    { key: "thermal", active: thermalActive, prob: rawThermalProb, weight: baseWeights.thermal ?? 0.33 },
    { key: "acoustic", active: acousticActive, prob: rawAcousticProb, weight: baseWeights.acoustic ?? 0.34 },
  ];

  const totalActiveWeight = activeSensors
    .filter((s) => s.active)
    .reduce((sum, s) => sum + s.weight, 0);

  const normalizedActiveWeights: Record<string, number> = {};
  let simulatedFusionScore = 0;

  activeSensors.forEach((s) => {
    if (s.active && totalActiveWeight > 0) {
      const nw = s.weight / totalActiveWeight;
      normalizedActiveWeights[s.key] = nw;
      simulatedFusionScore += s.prob * nw;
    } else {
      normalizedActiveWeights[s.key] = 0;
    }
  });

  const simulatedDetected = simulatedFusionScore >= 0.5;

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Multi-Sensor Fusion Engine"
        description="Interactive architecture and mathematical mechanics of adaptive multi-modal sensor fusion."
      />

      {/* Concept Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="grid gap-6 md:grid-cols-4 text-center">
          <div className="p-3">
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">1. Diverse Sensors</span>
            <p className="text-sm text-slate-300 mt-1">Radar (FMCW), Thermal (IR), Acoustic (Audio)</p>
          </div>
          <div className="p-3 border-t md:border-t-0 md:border-l border-slate-800">
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">2. Independent AI</span>
            <p className="text-sm text-slate-300 mt-1">Random Forest classifiers extract domain probabilities</p>
          </div>
          <div className="p-3 border-t md:border-t-0 md:border-l border-slate-800">
            <span className="text-xs uppercase tracking-wider text-violet-400 font-bold">3. BQPhy Optimization</span>
            <p className="text-sm text-slate-300 mt-1">Quantum solver assigns optimal reliability weights</p>
          </div>
          <div className="p-3 border-t md:border-t-0 md:border-l border-slate-800">
            <span className="text-xs uppercase tracking-wider text-green-400 font-bold">4. Fused Decision</span>
            <p className="text-sm text-slate-300 mt-1">Weighted fusion score produces final classification</p>
          </div>
        </div>
      </div>

      {/* Central Interactive Fusion Topology */}
      <Card className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Layers3 className="h-5 w-5 text-cyan-400" />
              Dynamic Fusion Topology
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Toggle any sensor modality below to observe how the fusion engine isolates disconnected sensors and re-normalizes contribution weights.
            </p>
          </div>

          {/* Interactive Sensor Toggles */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setRadarActive(!radarActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                radarActive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {radarActive ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
              Radar
            </button>

            <button
              type="button"
              onClick={() => setThermalActive(!thermalActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                thermalActive
                  ? "bg-orange-500/20 text-orange-300 border border-orange-500/30 font-semibold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {thermalActive ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
              Thermal
            </button>

            <button
              type="button"
              onClick={() => setAcousticActive(!acousticActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                acousticActive
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {acousticActive ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
              Acoustic
            </button>
          </div>
        </div>

        {/* Visual Fusion Flow Layout */}
        <div className="py-6 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column: 3 Sensor Nodes */}
            <div className="lg:col-span-4 space-y-4">
              {/* Radar Node */}
              <div
                className={`rounded-2xl p-4 border transition-all duration-300 ${
                  radarActive
                    ? "border-cyan-500/30 bg-cyan-950/20 text-white"
                    : "border-slate-800/40 bg-slate-950/40 text-slate-600 opacity-40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Radar className={`h-5 w-5 ${radarActive ? "text-cyan-400" : "text-slate-600"}`} />
                    <span className="font-semibold text-sm">Radar (FMCW)</span>
                  </div>
                  <span className="text-xs font-mono">
                    P = {(rawRadarProb * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 text-xs flex justify-between text-slate-400">
                  <span>Assigned Weight:</span>
                  <span className="font-bold text-cyan-300">
                    {(normalizedActiveWeights.radar * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Thermal Node */}
              <div
                className={`rounded-2xl p-4 border transition-all duration-300 ${
                  thermalActive
                    ? "border-orange-500/30 bg-orange-950/20 text-white"
                    : "border-slate-800/40 bg-slate-950/40 text-slate-600 opacity-40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Thermometer className={`h-5 w-5 ${thermalActive ? "text-orange-400" : "text-slate-600"}`} />
                    <span className="font-semibold text-sm">Thermal (IR)</span>
                  </div>
                  <span className="text-xs font-mono">
                    P = {(rawThermalProb * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 text-xs flex justify-between text-slate-400">
                  <span>Assigned Weight:</span>
                  <span className="font-bold text-orange-300">
                    {(normalizedActiveWeights.thermal * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Acoustic Node */}
              <div
                className={`rounded-2xl p-4 border transition-all duration-300 ${
                  acousticActive
                    ? "border-violet-500/30 bg-violet-950/20 text-white"
                    : "border-slate-800/40 bg-slate-950/40 text-slate-600 opacity-40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Mic className={`h-5 w-5 ${acousticActive ? "text-violet-400" : "text-slate-600"}`} />
                    <span className="font-semibold text-sm">Acoustic (Audio)</span>
                  </div>
                  <span className="text-xs font-mono">
                    P = {(rawAcousticProb * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 text-xs flex justify-between text-slate-400">
                  <span>Assigned Weight:</span>
                  <span className="font-bold text-violet-300">
                    {(normalizedActiveWeights.acoustic * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Column: Fusion Engine */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 text-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-500/40 bg-slate-900 shadow-xl shadow-cyan-950/60">
                <Cpu className="h-10 w-10 text-cyan-400 animate-pulse" />
              </div>
              <h4 className="mt-3 text-base font-bold text-white">
                BQPhy Fusion Engine
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Formula: S = &Sigma; (w<sub>i</sub> &times; p<sub>i</sub>) &ge; 0.50
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1 border border-slate-800 text-[11px] text-cyan-300 font-mono">
                <span>Active Channels: {activeSensors.filter((s) => s.active).length} / 3</span>
              </div>
            </div>

            {/* Right Column: Fused Decision Output */}
            <div className="lg:col-span-4">
              <div
                className={`rounded-3xl border p-6 transition-all duration-300 ${
                  simulatedDetected
                    ? "border-red-500/40 bg-red-950/30"
                    : "border-green-500/40 bg-green-950/30"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Fused Classification Output
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  {simulatedDetected ? "DRONE DETECTED" : "AREA CLEAR"}
                </h3>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Fused Target Score:</span>
                    <span className="font-mono font-bold text-white">
                      {simulatedFusionScore.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Classification Threshold:</span>
                    <span className="font-mono text-slate-400">&ge; 0.5000</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Threat Assessment:</span>
                    <span className={`font-bold ${simulatedDetected ? "text-red-400" : "text-green-400"}`}>
                      {simulatedDetected ? "CRITICAL THREAT" : "NO THREAT"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800">
                  <Link
                    to="/analysis"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>Run Live Capture Analysis</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Sensor Contribution & Weight Proportion Bars */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-cyan-400" />
            <h3 className="font-semibold text-white text-sm">
              Sensor Weight Contribution
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Relative weight assigned to each sensor by the BQPhy optimizer to balance detection certainty and false-alarm suppression.
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-cyan-300 font-medium">Radar Modality</span>
                <span className="font-bold text-white">{(normalizedActiveWeights.radar * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${normalizedActiveWeights.radar * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-orange-300 font-medium">Thermal Modality</span>
                <span className="font-bold text-white">{(normalizedActiveWeights.thermal * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-orange-400 transition-all duration-500"
                  style={{ width: `${normalizedActiveWeights.thermal * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-violet-300 font-medium">Acoustic Modality</span>
                <span className="font-bold text-white">{(normalizedActiveWeights.acoustic * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-violet-400 transition-all duration-500"
                  style={{ width: `${normalizedActiveWeights.acoustic * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Why Multi-Modal Fusion Card */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-400" />
            <h3 className="font-semibold text-white text-sm">
              Why Multi-Modal Fusion?
            </h3>
          </div>
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              <strong className="text-cyan-400">Radar Resistance to Visual Obscuration:</strong> FMCW radar penetrates fog, rain, and darkness where optical sensors fail, but can produce clutter reflections.
            </p>
            <p>
              <strong className="text-orange-400">Thermal Signature Verification:</strong> Infrared captures the thermal signature of electric motors and electronic speed controllers, distinguishing drones from birds.
            </p>
            <p>
              <strong className="text-violet-400">Acoustic Harmonic Confirmation:</strong> Drone micro-rotors emit distinct harmonic propeller frequencies (acoustic spectral peaks) that corroborate visual and radar tracks.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SensorFusion;
