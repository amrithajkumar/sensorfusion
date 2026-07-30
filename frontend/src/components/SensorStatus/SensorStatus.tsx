import {
  Radar,
  Thermometer,
  Mic,
  CircleCheck,
  CircleX,
} from "lucide-react";

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
    <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h3 className="text-2xl font-semibold text-slate-800">
        Sensor Status
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Current upload status of all connected sensors.
      </p>

      <div className="mt-8 space-y-5">

        {/* Radar */}

        <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4 hover:bg-slate-50 transition">

          <div className="flex items-center gap-4">

            <Radar
              size={24}
              className="text-cyan-500"
            />

            <span className="font-medium text-slate-700">
              Radar
            </span>

          </div>

          {radarFile ? (

            <div className="flex items-center gap-2">

              <CircleCheck
                size={18}
                className="text-green-500"
              />

              <span className="text-sm font-medium text-green-600">
                {radarFile.name}
              </span>

            </div>

          ) : (

            <div className="flex items-center gap-2">

              <CircleX
                size={18}
                className="text-red-500"
              />

              <span className="text-sm font-medium text-red-500">
                Not Uploaded
              </span>

            </div>

          )}

        </div>

        {/* Thermal */}

        <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4 hover:bg-slate-50 transition">

          <div className="flex items-center gap-4">

            <Thermometer
              size={24}
              className="text-orange-500"
            />

            <span className="font-medium text-slate-700">
              Thermal
            </span>

          </div>

          {thermalFile ? (

            <div className="flex items-center gap-2">

              <CircleCheck
                size={18}
                className="text-green-500"
              />

              <span className="text-sm font-medium text-green-600">
                {thermalFile.name}
              </span>

            </div>

          ) : (

            <div className="flex items-center gap-2">

              <CircleX
                size={18}
                className="text-red-500"
              />

              <span className="text-sm font-medium text-red-500">
                Not Uploaded
              </span>

            </div>

          )}

        </div>

        {/* Acoustic */}

        <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4 hover:bg-slate-50 transition">

          <div className="flex items-center gap-4">

            <Mic
              size={24}
              className="text-purple-500"
            />

            <span className="font-medium text-slate-700">
              Acoustic
            </span>

          </div>

          {acousticFile ? (

            <div className="flex items-center gap-2">

              <CircleCheck
                size={18}
                className="text-green-500"
              />

              <span className="text-sm font-medium text-green-600">
                {acousticFile.name}
              </span>

            </div>

          ) : (

            <div className="flex items-center gap-2">

              <CircleX
                size={18}
                className="text-red-500"
              />

              <span className="text-sm font-medium text-red-500">
                Not Uploaded
              </span>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default SensorStatus;