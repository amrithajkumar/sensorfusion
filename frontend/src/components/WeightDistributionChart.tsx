import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface WeightDistributionChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#22D3EE", // Radar
  "#F97316", // Thermal
  "#A855F7", // Acoustic
];

const WeightDistributionChart = ({
  data,
}: WeightDistributionChartProps) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={82}
            stroke="none"
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-5 flex justify-center gap-8 text-sm">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-2"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  COLORS[index % COLORS.length],
              }}
            />

            <span className="text-slate-300">
              {item.name}
            </span>

            <span className="font-semibold text-white">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightDistributionChart;