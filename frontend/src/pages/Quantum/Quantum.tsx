import {
  Cpu,
  Radar,
  Thermometer,
  Mic,
  BrainCircuit,
  Target,
  CircleCheck,
} from "lucide-react";

const Quantum = () => {
  return (
    <div className="p-8">

      {/* Header */}

      <h1 className="text-4xl font-bold text-slate-900 mb-2">
        Quantum Intelligence
      </h1>

      <p className="text-slate-500 mb-8">
        AI-powered adaptive multi-sensor fusion using Quantum Inspired
        Evolutionary Optimization (QIEO).
      </p>

      {/* Top Cards */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* Quantum Optimizer */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-5">

            <Cpu
              size={28}
              className="text-violet-600"
            />

            <h2 className="text-2xl font-semibold text-slate-800">
              Quantum Optimizer
            </h2>

          </div>

          <div className="space-y-4 text-slate-700">

            <div className="flex justify-between">
              <span>Algorithm</span>
              <span className="font-semibold">
                QIEO
              </span>
            </div>

            <div className="flex justify-between">
              <span>Optimization</span>
              <span className="font-semibold">
                Adaptive Weighted Fusion
              </span>
            </div>

            <div className="flex justify-between items-center">

              <span>Status</span>

              <div className="flex items-center gap-2">

                <CircleCheck
                  size={18}
                  className="text-green-500"
                />

                <span className="font-semibold text-green-600">
                  Active
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Sensor Fusion */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-5">

            <BrainCircuit
              size={28}
              className="text-cyan-600"
            />

            <h2 className="text-2xl font-semibold text-slate-800">
              Sensor Fusion
            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <Radar
                size={20}
                className="text-cyan-500"
              />

              <span>Radar Feature Extraction</span>

            </div>

            <div className="flex items-center gap-3">

              <Thermometer
                size={20}
                className="text-orange-500"
              />

              <span>Thermal Analysis</span>

            </div>

            <div className="flex items-center gap-3">

              <Mic
                size={20}
                className="text-purple-500"
              />

              <span>Acoustic Classification</span>

            </div>

            <div className="flex items-center gap-3">

              <BrainCircuit
                size={20}
                className="text-cyan-500"
              />

              <span>Adaptive Weighted Fusion</span>

            </div>

            <div className="flex items-center gap-3">

              <Cpu
                size={20}
                className="text-violet-600"
              />

              <span>Quantum Optimization</span>

            </div>

          </div>

        </div>

      </div>

      {/* Detection Pipeline */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-8">

        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Detection Pipeline
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center">

            <Radar
              size={36}
              className="text-cyan-500"
            />

            <p className="mt-3 font-medium">
              Radar
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center">

            <Thermometer
              size={36}
              className="text-orange-500"
            />

            <p className="mt-3 font-medium">
              Thermal
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center">

            <Mic
              size={36}
              className="text-purple-500"
            />

            <p className="mt-3 font-medium">
              Acoustic
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center">

            <Cpu
              size={36}
              className="text-violet-600"
            />

            <p className="mt-3 font-medium">
              Quantum Fusion
            </p>

          </div>

          <div className="rounded-xl border border-green-200 bg-green-50 p-6 flex flex-col items-center">

            <Target
              size={36}
              className="text-green-600"
            />

            <p className="mt-3 font-medium text-green-700">
              Prediction
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Quantum;
