import {
  Activity,
  Radar,
  Thermometer,
  Mic,
  Cpu,
} from "lucide-react";
import Card from "../common/Card";

const systems = [
  { name: "Backend API", icon: Activity },
  { name: "Radar Sensor", icon: Radar },
  { name: "Thermal Sensor", icon: Thermometer },
  { name: "Acoustic Sensor", icon: Mic },
  { name: "BQPhy Engine", icon: Cpu },
];

function SystemHealth() {
  return (
    <Card>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          System Health
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Current operational status of the AI platform.
        </p>
      </div>

      <div className="space-y-4">

        {systems.map((system) => {
          const Icon = system.icon;

          return (
            <div
              key={system.name}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3"
            >
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-cyan-500/10 p-2">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>

                <span className="text-sm text-slate-300">
                  {system.name}
                </span>

              </div>

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-green-400" />

                <span className="text-sm text-green-400">
                  Online
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </Card>
  );
}

export default SystemHealth;