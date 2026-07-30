import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Radar,
  Thermometer,
  Mic,
} from "lucide-react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import UploadCard from "../UploadCard/UploadCard";
import Button from "../Button/Button";
import SensorStatus from "../SensorStatus/SensorStatus";

import { runPrediction } from "../../services/predictionService";

function UploadSection() {
  const navigate = useNavigate();

  const [radarFile, setRadarFile] = useState<File | null>(null);
  const [thermalFile, setThermalFile] = useState<File | null>(null);
  const [acousticFile, setAcousticFile] = useState<File | null>(null);

  const handleRunDetection = async () => {
    const availableSensors = [
      radarFile,
      thermalFile,
      acousticFile,
    ].filter(Boolean);

    if (availableSensors.length === 0) {
      alert("Please upload at least one sensor file.");
      return;
    }

    try {
      const prediction = await runPrediction(
        radarFile,
        thermalFile,
        acousticFile
      );

      console.log("Prediction Result:", prediction);

      alert("Prediction completed successfully!");

      navigate("/prediction", {
        state: prediction,
      });

    } catch (error) {
      console.error(error);
      alert("Prediction failed. Check backend.");
    }
  };

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Upload sensor files"
        description="Select one or more sensor captures to run the existing multi-sensor prediction pipeline."
      />

      <Card className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <UploadCard
            title="Radar"
            icon={<Radar size={28} className="text-cyan-400" />}
            acceptedFile=".csv,.npy,.npz"
            selectedFile={radarFile}
            onFileSelect={setRadarFile}
          />

          <UploadCard
            title="Thermal"
            icon={<Thermometer size={28} className="text-orange-400" />}
            acceptedFile="image/*"
            selectedFile={thermalFile}
            onFileSelect={setThermalFile}
          />

          <UploadCard
            title="Acoustic"
            icon={<Mic size={28} className="text-violet-400" />}
            acceptedFile="audio/*"
            selectedFile={acousticFile}
            onFileSelect={setAcousticFile}
          />
        </div>

        <SensorStatus
          radarFile={radarFile}
          thermalFile={thermalFile}
          acousticFile={acousticFile}
        />

        <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            The prediction flow, API call, and routing behavior remain unchanged.
          </p>

          <div className="sm:w-auto">
            <Button
              title="Run Adaptive Detection"
              onClick={handleRunDetection}
            />
          </div>
        </div>
      </Card>
    </section>
  );
}

export default UploadSection;