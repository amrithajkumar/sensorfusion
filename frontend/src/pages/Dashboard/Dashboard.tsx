import { useState, useEffect } from "react";
import SectionHeader from "../../components/common/SectionHeader";
import StatusCard from "../../components/StatusCard/StatusCard";
import UploadSection from "../../components/UploadSection/UploadSection";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import { checkHealth } from "../../services/api";

function Dashboard() {
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    checkHealth()
      .then((res) => {
        if (mounted) setBackendOnline(res.status === "healthy");
      })
      .catch(() => {
        if (mounted) setBackendOnline(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Command Dashboard"
        description="Real-time multi-sensor surveillance and quantum-optimized stealth drone detection."
      />

      {/* System Status */}
      <div className="grid gap-6 lg:grid-cols-4">
        <StatusCard
          title="FastAPI Backend"
          value={
            backendOnline === null
              ? "Connecting..."
              : backendOnline
                ? "Connected"
                : "Offline"
          }
          status={
            backendOnline === null
              ? "warning"
              : backendOnline
                ? "success"
                : "error"
          }
        />

        <StatusCard
          title="AI Sensor Models"
          value="3 Online"
          status="success"
        />

        <StatusCard
          title="Quantum Engine"
          value="BQPhy Ready"
          status="success"
        />

        <StatusCard
          title="System Pipeline"
          value={backendOnline ? "Operational" : "Backend Offline"}
          status={backendOnline ? "success" : "warning"}
        />
      </div>

      {/* Detection Flow */}
      <UploadSection />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}

export default Dashboard;