import { useState } from "react";
import StatusCard from "../../components/StatusCard/StatusCard";
import UploadSection from "../../components/UploadSection/UploadSection";

function Dashboard() {

  
  const [radarFile, setRadarFile] = useState<File | null>(null);
  const [thermalFile, setThermalFile] = useState<File | null>(null);
  const [acousticFile, setAcousticFile] = useState<File | null>(null);

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Monitor your AI Drone Detection System.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-8">

        <StatusCard
          title="Backend"
          value="Connected"
          status="success"
        />

        <StatusCard
          title="AI Models"
          value="Ready"
          status="success"
        />

        <StatusCard
          title="Last Scan"
          value="--"
          status="warning"
        />

      </div>

      <div className="mt-10">
        <UploadSection />
      </div>

    </div>
  );
}

export default Dashboard;