import {
  Target,
  Activity,
  Radar,
  Thermometer,
  Mic,
  CircleCheck,
  CircleX,
  Cpu,
} from "lucide-react";

function Prediction() {
  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Adaptive Detection Result
        </h1>

        <p className="mt-2 text-slate-500">
          Multi-sensor fusion prediction using Quantum Optimized Detection.
        </p>
      </div>

      {/* Prediction Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-800">
          <Target size={24} className="text-cyan-600" />
          Target Prediction
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-8">

          <div>

            <p className="text-sm text-slate-500">
              Prediction
            </p>

            <div className="mt-3 flex items-center gap-3">

              <CircleCheck
                size={26}
                className="text-green-500"
              />

              <h3 className="text-3xl font-bold text-green-600">
                Drone Detected
              </h3>

            </div>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Confidence
            </p>

            <div className="mt-3 flex items-center gap-3">

              <Activity
                size={24}
                className="text-blue-500"
              />

              <h3 className="text-3xl font-bold text-slate-800">
                96.2%
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Sensors Used */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-slate-800">
          Sensors Used
        </h2>

        <div className="mt-6 space-y-4">

          <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">

            <div className="flex items-center gap-3">

              <Radar
                size={22}
                className="text-cyan-500"
              />

              <span className="font-medium">
                Radar
              </span>

            </div>

            <div className="flex items-center gap-2">

              <CircleCheck
                size={18}
                className="text-green-500"
              />

              <span className="font-medium text-green-600">
                Available
              </span>

            </div>

          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">

            <div className="flex items-center gap-3">

              <Thermometer
                size={22}
                className="text-orange-500"
              />

              <span className="font-medium">
                Thermal
              </span>

            </div>

            <div className="flex items-center gap-2">

              <CircleCheck
                size={18}
                className="text-green-500"
              />

              <span className="font-medium text-green-600">
                Available
              </span>

            </div>

          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">

            <div className="flex items-center gap-3">

              <Mic
                size={22}
                className="text-purple-500"
              />

              <span className="font-medium">
                Acoustic
              </span>

            </div>

            <div className="flex items-center gap-2">

              <CircleX
                size={18}
                className="text-red-500"
              />

              <span className="font-medium text-red-500">
                Missing
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Sensor Contribution */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-slate-800">
          Sensor Contribution
        </h2>

        <div className="mt-6 space-y-4">

          <div className="flex justify-between">
            <span>Radar</span>
            <span className="font-semibold">61%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200">
            <div className="h-2 w-[61%] rounded-full bg-cyan-500"></div>
          </div>

          <div className="flex justify-between">
            <span>Thermal</span>
            <span className="font-semibold">39%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200">
            <div className="h-2 w-[39%] rounded-full bg-orange-500"></div>
          </div>

          <div className="flex justify-between">
            <span>Acoustic</span>
            <span className="font-semibold">0%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-200">
            <div className="h-2 w-[0%] rounded-full bg-purple-500"></div>
          </div>

        </div>

      </div>

      {/* Quantum Optimization */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-800">

          <Cpu
            size={24}
            className="text-violet-600"
          />

          Quantum Optimization

        </h2>

        <div className="mt-6 grid grid-cols-2 gap-8">

          <div>

            <p className="text-sm text-slate-500">
              Optimizer
            </p>

            <p className="font-medium text-slate-800">
              QuantumNow QIEO
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Fusion Strategy
            </p>

            <p className="font-medium text-slate-800">
              Adaptive Weighted Fusion
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Inference Time
            </p>

            <p className="font-medium text-slate-800">
              0.18 sec
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Optimization Status
            </p>

            <div className="mt-1 flex items-center gap-2">

              <CircleCheck
                size={18}
                className="text-green-500"
              />

              <span className="font-medium text-green-600">
                Completed
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Prediction;