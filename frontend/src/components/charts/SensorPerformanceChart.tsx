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

const data = [
  {
    time: "09:00",
    radar: 94,
    thermal: 83,
    acoustic: 71,
  },
  {
    time: "09:05",
    radar: 95,
    thermal: 84,
    acoustic: 72,
  },
  {
    time: "09:10",
    radar: 96,
    thermal: 82,
    acoustic: 74,
  },
  {
    time: "09:15",
    radar: 95,
    thermal: 85,
    acoustic: 73,
  },
  {
    time: "09:20",
    radar: 97,
    thermal: 86,
    acoustic: 75,
  },
  {
    time: "09:25",
    radar: 98,
    thermal: 87,
    acoustic: 76,
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
          Live confidence trends across Radar, Thermal and Acoustic sensors.
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
            domain={[60, 100]}
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
              color: "#fff",
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
            dot={false}
            activeDot={{
              r: 5,
            }}
          />

          <Line
            type="monotone"
            dataKey="thermal"
            name="Thermal"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 5,
            }}
          />

          <Line
            type="monotone"
            dataKey="acoustic"
            name="Acoustic"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 5,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SensorPerformanceChart;