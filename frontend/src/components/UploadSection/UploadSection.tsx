import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <section className="w-full">
      <h2 className="text-3xl font-bold text-gray-900">
        Upload Sensor Files
      </h2>

      <p className="mt-2 text-gray-500">
        Upload one or more sensor files to perform adaptive multi-sensor drone detection.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <UploadCard
          title="Radar"
          icon="📡"
          acceptedFile=".csv,.npy,.npz"
          selectedFile={radarFile}
          onFileSelect={setRadarFile}
        />

        <UploadCard
          title="Thermal"
          icon="🌡️"
          acceptedFile="image/*"
          selectedFile={thermalFile}
          onFileSelect={setThermalFile}
        />

        <UploadCard
          title="Acoustic"
          icon="🎙️"
          acceptedFile="audio/*"
          selectedFile={acousticFile}
          onFileSelect={setAcousticFile}
        />
      </div>

      <div className="mt-8">
        <SensorStatus
          radarFile={radarFile}
          thermalFile={thermalFile}
          acousticFile={acousticFile}
        />
      </div>

      <div className="mt-8">
        <Button
          title="Run Adaptive Detection"
          onClick={handleRunDetection}
        />
      </div>
    </section>
  );
}

export default UploadSection;