import SectionHeader from "../../components/common/SectionHeader";
import StatusCard from "../../components/StatusCard/StatusCard";
import UploadSection from "../../components/UploadSection/UploadSection";
import RecentActivity from "../../components/RecentActivity/RecentActivity";

function Dashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Dashboard"
        description="Monitor and manage the QuantumFusion AI drone detection platform."
      />

      {/* System Status */}
      <div className="grid gap-6 lg:grid-cols-4">
        <StatusCard
          title="Backend"
          value="Connected"
          status="success"
        />

        <StatusCard
          title="AI Models"
          value="3 Loaded"
          status="success"
        />

        <StatusCard
          title="Quantum Engine"
          value="BQPhy Ready"
          status="success"
        />

        <StatusCard
          title="System Status"
          value="Operational"
          status="success"
        />
      </div>

      {/* Detection */}
      <UploadSection />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}

export default Dashboard;