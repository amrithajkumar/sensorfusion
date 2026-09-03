import Card from "../common/Card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const prediction = JSON.parse(
  localStorage.getItem("latestPrediction") || "{}"
);

const probabilities = prediction.sensor_probabilities || {};

const data = [
  {
    time: "Current",
    radar: (probabilities.radar ?? 0) * 100,
    thermal: (probabilities.thermal ?? 0) * 100,
    acoustic: (probabilities.acoustic ?? 0) * 100,
  },
];

const SensorPerformanceChart = () => {
  return (
    <Card className="h-[430px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Sensor Performance Trend
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Live confidence reported by the backend.
        </p>
      </div>

      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={data}>
          <CartesianGrid
            stroke="#1e293b"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="time"
            stroke="#64748b"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 100]}
            stroke="#64748b"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "#ffffff",
            }}
          />

          <Legend
            wrapperStyle={{
              color: "#cbd5e1",
              paddingTop: 20,
            }}
          />

          <Line
            type="monotone"
            dataKey="radar"
            name="Radar"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="thermal"
            name="Thermal"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="acoustic"
            name="Acoustic"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SensorPerformanceChart;