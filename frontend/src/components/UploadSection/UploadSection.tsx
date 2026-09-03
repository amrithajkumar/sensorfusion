import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Radar,
  Thermometer,
  Mic,
  AlertCircle,
  Sparkles,
  RotateCcw,
  Loader2,
} from "lucide-react";

import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import UploadCard from "../UploadCard/UploadCard";
import Button from "../Button/Button";
import SensorStatus from "../SensorStatus/SensorStatus";
import LoadingOverlay from "../Loading/Loading";

import { runPrediction } from "../../services/predictionService";
import { fetchDemoSample, extractErrorMessage } from "../../services/api";

function UploadSection() {
  const navigate = useNavigate();

  const [radarFile, setRadarFile] = useState<File | null>(null);
  const [thermalFile, setThermalFile] = useState<File | null>(null);
  const [acousticFile, setAcousticFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("Uploading sensor data");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const handleClearAll = () => {
    setRadarFile(null);
    setThermalFile(null);
    setAcousticFile(null);
    setErrorMessage(null);
  };

  const handleLoadDemoSamples = async () => {
    setIsDemoLoading(true);
    setErrorMessage(null);
    try {
      const [rFile, tFile, aFile] = await Promise.all([
        fetchDemoSample("radar"),
        fetchDemoSample("thermal"),
        fetchDemoSample("acoustic"),
      ]);
      setRadarFile(rFile);
      setThermalFile(tFile);
      setAcousticFile(aFile);
    } catch (err) {
      setErrorMessage(
        `Failed to load demo files from backend: ${extractErrorMessage(err)}`
      );
    } finally {
      setIsDemoLoading(false);
    }
  };

  const handleRunDetection = async () => {
    setErrorMessage(null);

    const availableSensors = [
      radarFile,
      thermalFile,
      acousticFile,
    ].filter(Boolean);

    // Backend requires at least two sensors
    if (availableSensors.length < 2) {
      setErrorMessage(
        "Multi-sensor fusion requires at least two sensor inputs (e.g. Radar + Acoustic, or Radar + Thermal + Acoustic). Please upload at least 2 sensor files."
      );
      return;
    }

    setIsLoading(true);
    setLoadingStage("Uploading sensor data");

    // Dynamic stage progression matching the actual backend stages
    const stage1 = setTimeout(
      () => setLoadingStage("Extracting multi-modal features"),
      400
    );
    const stage2 = setTimeout(
      () => setLoadingStage("Running AI models (Radar, Thermal, Acoustic)"),
      900
    );
    const stage3 = setTimeout(
      () => setLoadingStage("Optimizing sensor fusion with BQPhy"),
      1500
    );
    const stage4 = setTimeout(
      () => setLoadingStage("Generating final prediction"),
      2000
    );

    try {
      const prediction = await runPrediction(
        radarFile,
        thermalFile,
        acousticFile
      );

      // Store latest prediction for other pages
      localStorage.setItem("latestPrediction", JSON.stringify(prediction));

      navigate("/prediction", {
        state: prediction,
      });
    } catch (error) {
      const formattedError = extractErrorMessage(error);
      setErrorMessage(formattedError);
    } finally {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(stage4);
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      {isLoading && <LoadingOverlay stage={loadingStage} />}

      <SectionHeader
        title="Upload sensor files"
        description="Select at least two sensor captures (Radar, Thermal, Acoustic) to run the multi-sensor quantum inference pipeline."
      />

      <Card className="space-y-6">
        {/* Quick Demo & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Sensor Modalities
            </span>
            <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400">
              Min. 2 Required
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLoadDemoSamples}
              disabled={isDemoLoading || isLoading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/20 disabled:opacity-50"
            >
              {isDemoLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              <span>Load Demo Samples</span>
            </button>

            {(radarFile || thermalFile || acousticFile) && (
              <button
                type="button"
                onClick={handleClearAll}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <div className="flex-1">
              <p className="font-medium text-red-300">Action Required</p>
              <p className="mt-0.5 text-xs leading-relaxed text-red-200/90">
                {errorMessage}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <UploadCard
            title="Radar"
            icon={<Radar size={28} className="text-cyan-400" />}
            acceptedFile=".npy,.npz,.csv"
            selectedFile={radarFile}
            onFileSelect={(f) => {
              setRadarFile(f);
              setErrorMessage(null);
            }}
          />

          <UploadCard
            title="Thermal"
            icon={<Thermometer size={28} className="text-orange-400" />}
            acceptedFile=".jpg,.jpeg,.png,image/*"
            selectedFile={thermalFile}
            onFileSelect={(f) => {
              setThermalFile(f);
              setErrorMessage(null);
            }}
          />

          <UploadCard
            title="Acoustic"
            icon={<Mic size={28} className="text-violet-400" />}
            acceptedFile=".wav,.mp3,.flac,audio/*"
            selectedFile={acousticFile}
            onFileSelect={(f) => {
              setAcousticFile(f);
              setErrorMessage(null);
            }}
          />
        </div>

        <SensorStatus
          radarFile={radarFile}
          thermalFile={thermalFile}
          acousticFile={acousticFile}
        />

        <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            Executes classical AI inference followed by BosonQ BQPhy Quantum Optimization.
          </p>

          <div className="sm:w-auto">
            <Button
              title={isLoading ? "Processing..." : "Run Adaptive Detection"}
              onClick={handleRunDetection}
              disabled={isLoading}
            />
          </div>
        </div>
      </Card>
    </section>
  );
}

export default UploadSection;