import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  Info,
} from "lucide-react";
import SectionHeader from "../../components/common/SectionHeader";
import { RadarConsole } from "../../components/SensorWorkspaces/RadarConsole";
import { AcousticConsole } from "../../components/SensorWorkspaces/AcousticConsole";
import { ThermalConsole } from "../../components/SensorWorkspaces/ThermalConsole";
import { StreamConvergence } from "../../components/SensorWorkspaces/StreamConvergence";
import LoadingOverlay from "../../components/Loading/Loading";
import { fetchDemoSample, predictSensors, extractErrorMessage } from "../../services/api";

function SensorAnalysis() {
  const [radarFile, setRadarFile] = useState<File | null>(null);
  const [thermalFile, setThermalFile] = useState<File | null>(null);
  const [acousticFile, setAcousticFile] = useState<File | null>(null);

  const [mode, setMode] = useState<"standard" | "replay">("standard");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStage, setLoadingStage] = useState("Running multi-sensor quantum inference...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const uploadedCount = [radarFile, thermalFile, acousticFile].filter(Boolean).length;
  const canAnalyze = uploadedCount >= 2;

  // Load certified demo captures from the backend dataset
  const handleLoadDemoSamples = async () => {
    setErrorMessage(null);
    try {
      const [rBlob, tBlob, aBlob] = await Promise.all([
        fetchDemoSample("radar"),
        fetchDemoSample("thermal"),
        fetchDemoSample("acoustic"),
      ]);
      setRadarFile(rBlob);
      setThermalFile(tBlob);
      setAcousticFile(aBlob);
    } catch (err) {
      setErrorMessage(
        "Failed to fetch demo files from backend. Ensure FastAPI server is running."
      );
    }
  };

  const handleReset = () => {
    setRadarFile(null);
    setThermalFile(null);
    setAcousticFile(null);
    setErrorMessage(null);
  };

  // Run live analysis through FastAPI backend
  const handleStartAnalysis = async () => {
    setErrorMessage(null);

    if (!canAnalyze) {
      setErrorMessage(
        "Sensor Fusion Requirement: At least 2 sensor files are required (e.g. Radar + Thermal or Radar + Acoustic) to execute quantum multi-sensor fusion."
      );
      return;
    }

    setIsAnalyzing(true);
    setLoadingStage("Extracting multi-modal features & classical AI inference...");

    try {
      const response = await predictSensors(radarFile, thermalFile, acousticFile);

      setLoadingStage("BQPhy Quantum Optimization & adaptive fusion complete!");

      // Store in localStorage for persistence
      localStorage.setItem("latestPrediction", JSON.stringify(response));

      // Navigate to Detection Result
      setTimeout(() => {
        setIsAnalyzing(false);
        navigate("/prediction", { state: response });
      }, 500);
    } catch (err) {
      setIsAnalyzing(false);
      setErrorMessage(extractErrorMessage(err));
    }
  };

  // Analysis Replay demonstration trigger
  const handleTriggerReplay = async () => {
    await handleLoadDemoSamples();
    setMode("replay");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {isAnalyzing && <LoadingOverlay stage={loadingStage} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeader
          title="Multi-Modal Sensor Analysis Workspace"
          description="Interactive sensor consoles for FMCW Radar, Thermal Infrared, and Harmonic Acoustic signal analysis."
        />

        {/* Operating Mode Switcher */}
        <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-1.5 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setMode("standard")}
            className={`px-3 py-1.5 rounded-xl transition ${
              mode === "standard"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Standard Capture Mode
          </button>
          <button
            type="button"
            onClick={handleTriggerReplay}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              mode === "replay"
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/40 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span>Analysis Replay Mode</span>
          </button>
        </div>
      </div>

      {/* Mode Clarification Banner */}
      {mode === "replay" ? (
        <div className="flex items-start gap-3 rounded-2xl border border-violet-500/30 bg-violet-950/20 p-4 text-xs text-violet-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
          <div>
            <span className="font-bold text-violet-300">
              ANALYSIS REPLAY / DEMONSTRATION MODE ACTIVE:
            </span>{" "}
            This mode replays verified multi-modal dataset captures through the real backend AI models and BQPhy quantum optimizer. Visualizations are synchronized with the actual input data.
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-xs text-cyan-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
          <div>
            <span className="font-bold text-cyan-300">SENSOR INGESTION NOTICE:</span>{" "}
            Upload at least 2 sensor files (.npy matrix for Radar, .jpg/.png for Thermal, .wav for Acoustic) or click &ldquo;Load Certified Demo Captures&rdquo; to test live multi-sensor fusion.
          </div>
        </div>
      )}

      {/* Three Active Sensor Workspaces Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Radar Console */}
        <RadarConsole
          file={radarFile}
          onFileSelect={(f) => setRadarFile(f)}
          isAnalyzing={isAnalyzing}
          isDetected={false}
        />

        {/* Thermal Console */}
        <ThermalConsole
          file={thermalFile}
          onFileSelect={(f) => setThermalFile(f)}
          isAnalyzing={isAnalyzing}
          isDetected={false}
        />

        {/* Acoustic Console */}
        <AcousticConsole
          file={acousticFile}
          onFileSelect={(f) => setAcousticFile(f)}
          isAnalyzing={isAnalyzing}
          isDetected={false}
        />
      </div>

      {/* Stream Convergence Pipeline Component */}
      <StreamConvergence
        isAnalyzing={isAnalyzing}
        hasResult={false}
        activeSensors={{
          radar: Boolean(radarFile),
          thermal: Boolean(thermalFile),
          acoustic: Boolean(acousticFile),
        }}
      />

      {/* Error Alert Message */}
      {errorMessage && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-xs text-red-200">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Analysis Execution Command Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl border border-slate-800 bg-slate-950/90 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">
            Active Sensors: <strong className="text-cyan-300 font-bold">{uploadedCount} / 3</strong>
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono ${
              canAnalyze
                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
            }`}
          >
            {canAnalyze ? "READY FOR FUSION" : "MINIMUM 2 REQUIRED"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLoadDemoSamples}
            className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-semibold text-slate-300 hover:border-cyan-500/40 hover:text-white transition"
          >
            Load Certified Demo Captures
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={uploadedCount === 0}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition disabled:opacity-30"
            title="Reset Workspace"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleStartAnalysis}
            disabled={!canAnalyze || isAnalyzing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/25 disabled:opacity-40"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>{mode === "replay" ? "REPLAY LIVE ANALYSIS" : "START ADAPTIVE DETECTION"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SensorAnalysis;
