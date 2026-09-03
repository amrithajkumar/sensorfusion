import Card from "../common/Card";
import { Cpu } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const prediction = JSON.parse(
  localStorage.getItem("latestPrediction") || "{}"
);

const weights = prediction.quantum?.weights || {};

const data = [
  {
    name: "Radar",
    value: (weights.radar ?? 0) * 100,
  },
  {
    name: "Thermal",
    value: (weights.thermal ?? 0) * 100,
  },
  {
    name: "Acoustic",
    value: (weights.acoustic ?? 0) * 100,
  },
];

const COLORS = [
  "#06b6d4",
  "#f59e0b",
  "#8b5cf6",
];

const FusionWeightChart = () => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Quantum Fusion Weight Distribution
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Live BQPhy optimized sensor weights from the latest prediction.
          </p>
        </div>

        <Cpu
          size={22}
          className="text-cyan-400"
        />
      </div>

      <div className="mt-8 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              animationDuration={900}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#ffffff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="font-medium text-white">
                {item.name}
              </span>
            </div>

            <span className="font-semibold text-slate-300">
              {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FusionWeightChart;