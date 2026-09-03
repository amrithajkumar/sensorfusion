import { useState } from "react";
import {
  FlaskConical,
  Radar,
  Thermometer,
  Mic,
  AlertTriangle,
  Play,
  Loader2,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import { fetchDemoSample, predictSensors, extractErrorMessage, type PredictionResponse } from "../../services/api";

interface ExperimentResult {
  activeCount: number;
  activeSensors: string[];
  prediction: PredictionResponse;
  timestamp: string;
}

function SensorFailureLab() {
  const [radarEnabled, setRadarEnabled] = useState(true);
  const [thermalEnabled, setThermalEnabled] = useState(true);
  const [acousticEnabled, setAcousticEnabled] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<ExperimentResult[]>([]);

  const activeSensorsList = [
    radarEnabled ? "Radar" : null,
    thermalEnabled ? "Thermal" : null,
    acousticEnabled ? "Acoustic" : null,
  ].filter(Boolean) as string[];

  const activeCount = activeSensorsList.length;

  const handleRunExperiment = async () => {
    setErrorMessage(null);

    if (activeCount < 2) {
      setErrorMessage(
        "Sensor Fusion requirement: At least 2 active sensors are required to run multi-sensor fusion. Please enable at least two sensors."
      );
      return;
    }

    setIsLoading(true);

    try {
      // Fetch the respective demo sample blobs for the active sensors
      const rFile = radarEnabled ? await fetchDemoSample("radar") : null;
      const tFile = thermalEnabled ? await fetchDemoSample("thermal") : null;
      const aFile = acousticEnabled ? await fetchDemoSample("acoustic") : null;

      // Run live real inference through FastAPI
      const result = await predictSensors(rFile, tFile, aFile);

      const record: ExperimentResult = {
        activeCount,
        activeSensors: activeSensorsList,
        prediction: result,
        timestamp: new Date().toLocaleTimeString(),
      };

      setHistory((prev) => [record, ...prev]);
    } catch (err) {
      setErrorMessage(extractErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const latest = history[0];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Sensor Failure & Degradation Lab"
        description="Controlled experimental sandbox to evaluate system resilience when sensing modalities fail or suffer electronic counter-measures."
      />

      {/* Critical Conceptual Distinction Banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
        <div>
          <span className="font-bold text-amber-300">SCIENTIFIC RIGOR NOTE:</span>{" "}
          <strong>Prediction Confidence is NOT Dataset Accuracy.</strong> Confidence reflects the mathematical fused certainty for a single capture run. Test dataset accuracy (98%) is measured across large benchmark evaluation corpora.
        </div>
      </div>

      {/* Experiment Controls */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sensor Toggle Controllers */}
        <Card className="space-y-5 lg:col-span-1">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-cyan-400" />
              <h3 className="font-semibold text-white text-sm">Sensor Channels</h3>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-mono font-semibold ${
                activeCount >= 2
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {activeCount} / 3 Active
            </span>
          </div>

          <div className="space-y-3">
            {/* Radar Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <Radar className={`h-5 w-5 ${radarEnabled ? "text-cyan-400" : "text-slate-600"}`} />
                <div>
                  <span className="font-medium text-xs text-white block">Radar Sensor</span>
                  <span className="text-[11px] text-slate-500">77GHz FMCW Channel</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setRadarEnabled(!radarEnabled)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  radarEnabled
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "bg-slate-900 text-slate-500 border border-slate-800"
                }`}
              >
                {radarEnabled ? "ONLINE" : "MUTED"}
              </button>
            </div>

            {/* Thermal Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <Thermometer className={`h-5 w-5 ${thermalEnabled ? "text-orange-400" : "text-slate-600"}`} />
                <div>
                  <span className="font-medium text-xs text-white block">Thermal Sensor</span>
                  <span className="text-[11px] text-slate-500">Infrared Optical Array</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setThermalEnabled(!thermalEnabled)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  thermalEnabled
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/40"
                    : "bg-slate-900 text-slate-500 border border-slate-800"
                }`}
              >
                {thermalEnabled ? "ONLINE" : "MUTED"}
              </button>
            </div>

            {/* Acoustic Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <Mic className={`h-5 w-5 ${acousticEnabled ? "text-violet-400" : "text-slate-600"}`} />
                <div>
                  <span className="font-medium text-xs text-white block">Acoustic Sensor</span>
                  <span className="text-[11px] text-slate-500">Harmonic Audio Array</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAcousticEnabled(!acousticEnabled)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  acousticEnabled
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                    : "bg-slate-900 text-slate-500 border border-slate-800"
                }`}
              >
                {acousticEnabled ? "ONLINE" : "MUTED"}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="text-xs text-red-300 bg-red-950/30 p-3 rounded-xl border border-red-500/30">
              {errorMessage}
            </div>
          )}

          <button
            type="button"
            onClick={handleRunExperiment}
            disabled={isLoading || activeCount < 2}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 font-bold text-slate-950 hover:bg-cyan-400 transition text-xs disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Running Degraded Analysis...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" />
                <span>Trigger Degradation Run</span>
              </>
            )}
          </button>
        </Card>

        {/* Experiment Live Output */}
        <Card className="space-y-5 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-white text-sm">
              Live Resilience Output
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {latest ? `Last Run: ${latest.timestamp}` : "No runs executed yet"}
            </span>
          </div>

          {latest ? (
            <div className="space-y-4">
              <div
                className={`p-5 rounded-2xl border ${
                  latest.prediction.detected
                    ? "border-red-500/30 bg-red-950/20"
                    : "border-green-500/30 bg-green-950/20"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Detection Under {latest.activeCount}/3 Sensors
                    </span>
                    <h2 className="text-2xl font-black text-white mt-1">
                      {latest.prediction.prediction}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">
                      {(latest.prediction.confidence * 100).toFixed(1)}%
                    </span>
                    <p className="text-xs text-slate-400">Fused Certainty</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Active Sensors</span>
                    <p className="font-semibold text-slate-200 mt-0.5">
                      {latest.activeSensors.join(" + ")}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">BQPhy Optimization</span>
                    <p className="font-semibold text-cyan-400 mt-0.5">
                      Gain: +{latest.prediction.comparison.quantum_improvement_percent.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Threat Level</span>
                    <p className="font-semibold text-red-400 mt-0.5">
                      {latest.prediction.threat_level}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sensor breakdown for this degraded run */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-500">Radar Channel</span>
                  <p className="text-sm font-bold text-cyan-400 mt-1">
                    {latest.activeSensors.includes("Radar")
                      ? `${(latest.prediction.sensor_probabilities.radar * 100).toFixed(1)}%`
                      : "MUTED / OFFLINE"}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-500">Thermal Channel</span>
                  <p className="text-sm font-bold text-orange-400 mt-1">
                    {latest.activeSensors.includes("Thermal")
                      ? `${(latest.prediction.sensor_probabilities.thermal * 100).toFixed(1)}%`
                      : "MUTED / OFFLINE"}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-500">Acoustic Channel</span>
                  <p className="text-sm font-bold text-violet-400 mt-1">
                    {latest.activeSensors.includes("Acoustic")
                      ? `${(latest.prediction.sensor_probabilities.acoustic * 100).toFixed(1)}%`
                      : "MUTED / OFFLINE"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center rounded-2xl border border-dashed border-slate-800 text-xs text-slate-500">
              Select sensor states on the left and click &ldquo;Trigger Degradation Run&rdquo; to test real-world sensor failure behavior.
            </div>
          )}
        </Card>
      </div>

      {/* Historical Experiment Run Log */}
      {history.length > 1 && (
        <Card className="space-y-4">
          <h3 className="font-semibold text-white text-sm">
            Experiment Comparison Log
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Active Configuration</th>
                  <th className="py-2.5 px-3">Prediction</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3">Quantum Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {history.map((h, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-3 text-slate-500 font-mono">{h.timestamp}</td>
                    <td className="py-2.5 px-3 font-medium text-white">
                      {h.activeSensors.join(" + ")} ({h.activeCount}/3)
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-cyan-300">
                      {h.prediction.prediction}
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      {(h.prediction.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3 text-green-400 font-mono">
                      +{h.prediction.comparison.quantum_improvement_percent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

export default SensorFailureLab;
