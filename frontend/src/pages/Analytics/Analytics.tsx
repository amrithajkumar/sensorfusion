import { useEffect, useState } from "react";
import ChartCard from "../../components/ChartCard/ChartCard";
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
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-2">
        Analytics Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Live analytics generated from prediction history.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <ChartCard
          title="Total Predictions"
          value={total}
        />

        <ChartCard
          title="Drone Detected"
          value={droneCount}
        />

        <ChartCard
          title="No Drone"
          value={noDroneCount}
        />

        <ChartCard
          title="Average Confidence"
          value={`${averageConfidence}%`}
        />

      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          Analytics Summary
        </h2>

        <ul className="space-y-3 text-gray-700">

          <li>
            ✔ Total predictions processed: {total}
          </li>

          <li>
            ✔ Drone detections: {droneCount}
          </li>

          <li>
            ✔ No Drone detections: {noDroneCount}
          </li>

          <li>
            ✔ Average confidence: {averageConfidence}%
          </li>

          <li>
            ✔ Fusion strategy: Adaptive Weighted Fusion
          </li>

          <li>
            ✔ Quantum optimizer: QIEO
          </li>

        </ul>

      </div>
    </div>
  );
};

export default Analytics;