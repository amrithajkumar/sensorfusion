import { Radar, Thermometer, Mic } from "lucide-react";
import Card from "../common/Card";
import StatusBadge from "../common/StatusBadge";

type SensorStatusProps = {
  radarFile: File | null;
  thermalFile: File | null;
  acousticFile: File | null;
};

function SensorStatus({
  radarFile,
  thermalFile,
  acousticFile,
}: SensorStatusProps) {
  return (
    <Card className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Sensor Status</h3>
          <p className="mt-1 text-sm text-slate-400">
            Current upload status of all connected sensors.
          </p>
        </div>

        <StatusBadge status="warning" text="Upload state" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 transition hover:border-cyan-500/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Radar size={24} className="text-cyan-400" />

            <div>
              <span className="block font-medium text-white">Radar</span>
              <span className="text-sm text-slate-400">
                CSV, NPY or NPZ input
              </span>
            </div>
          </div>

          {radarFile ? (
            <div className="flex items-center gap-2">
              <StatusBadge status="success" text="Uploaded" />
              <span className="max-w-[220px] truncate text-sm text-slate-300">
                {radarFile.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <StatusBadge status="error" text="Missing" />
              <span className="text-sm text-slate-400">Not uploaded</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 transition hover:border-cyan-500/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Thermometer size={24} className="text-orange-400" />

            <div>
              <span className="block font-medium text-white">Thermal</span>
              <span className="text-sm text-slate-400">
                Image-based thermal capture
              </span>
            </div>
          </div>

          {thermalFile ? (
            <div className="flex items-center gap-2">
              <StatusBadge status="success" text="Uploaded" />
              <span className="max-w-[220px] truncate text-sm text-slate-300">
                {thermalFile.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <StatusBadge status="error" text="Missing" />
              <span className="text-sm text-slate-400">Not uploaded</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 transition hover:border-cyan-500/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Mic size={24} className="text-violet-400" />

            <div>
              <span className="block font-medium text-white">Acoustic</span>
              <span className="text-sm text-slate-400">
                Audio or waveform input
              </span>
            </div>
          </div>

          {acousticFile ? (
            <div className="flex items-center gap-2">
              <StatusBadge status="success" text="Uploaded" />
              <span className="max-w-[220px] truncate text-sm text-slate-300">
                {acousticFile.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <StatusBadge status="error" text="Missing" />
              <span className="text-sm text-slate-400">Not uploaded</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default SensorStatus;