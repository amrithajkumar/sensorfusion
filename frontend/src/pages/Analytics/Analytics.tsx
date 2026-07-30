import { useEffect, useState } from "react";

import ChartCard from "../../components/ChartCard/ChartCard";
import SectionHeader from "../../components/common/SectionHeader";

import SensorPerformanceChart from "../../components/charts/SensorPerformanceChart";
import SensorContributionChart from "../../components/charts/SensorContributionChart";
import FusionWeightChart from "../../components/charts/FusionWeightChart";

import { getHistory } from "../../services/historyService";

const Analytics = () => {
  const [total, setTotal] = useState(0);
  const [droneCount, setDroneCount] = useState(0);
  const [noDroneCount, setNoDroneCount] = useState(0);
  const [averageConfidence, setAverageConfidence] = useState("0");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const history = await getHistory();

        setTotal(history.length);

        const drone = history.filter(
          (item: any) => item.prediction === "Drone"
        ).length;

        const noDrone = history.filter(
          (item: any) => item.prediction === "No Drone"
        ).length;

        setDroneCount(drone);
        setNoDroneCount(noDrone);

        if (history.length > 0) {
          const avg =
            history.reduce(
              (sum: number, item: any) => sum + item.confidence,
              0
            ) / history.length;

          setAverageConfidence((avg * 100).toFixed(1));
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadAnalytics();
  }, []);

  return (
  <div className="space-y-8">
    <SectionHeader
      title="Analytics"
      description="Monitor sensor performance and quantum fusion insights."
    />

    {/* Metric Cards */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <ChartCard title="Total Predictions" value={total} />
      <ChartCard title="Drone Detected" value={droneCount} />
      <ChartCard title="No Drone" value={noDroneCount} />
      <ChartCard
        title="Average Confidence"
        value={`${averageConfidence}%`}
      />
    </div>

    {/* Sensor Performance Trend */}
    <SensorPerformanceChart />

    {/* Bottom Charts */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <SensorContributionChart />

      <FusionWeightChart />
    </div>
  </div>
);

};

export default Analytics;