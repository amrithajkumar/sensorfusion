function Prediction() {
  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Adaptive Detection Result
        </h1>

        <p className="mt-2 text-gray-500">
          Multi-sensor fusion prediction using Quantum Optimized Detection.
        </p>
      </div>

      {/* Prediction Summary */}
      <div className="rounded-xl bg-white p-6 shadow-sm border">

        <h2 className="text-xl font-semibold">
          Target Prediction
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">
              Prediction
            </p>

            <h3 className="mt-2 text-3xl font-bold text-green-600">
              Drone Detected
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Confidence
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              96.2%
            </h3>
          </div>

        </div>

      </div>

      {/* Sensors Used */}
      <div className="rounded-xl bg-white p-6 shadow-sm border">

        <h2 className="text-xl font-semibold">
          Sensors Used
        </h2>

        <div className="mt-5 space-y-3">

          <div className="flex justify-between">
            <span>📡 Radar</span>
            <span className="text-green-600 font-medium">
              Available
            </span>
          </div>

          <div className="flex justify-between">
            <span>🌡️ Thermal</span>
            <span className="text-green-600 font-medium">
              Available
            </span>
          </div>

          <div className="flex justify-between">
            <span>🎙️ Acoustic</span>
            <span className="text-red-500 font-medium">
              Missing
            </span>
          </div>

        </div>

      </div>

      {/* Sensor Contribution */}
      <div className="rounded-xl bg-white p-6 shadow-sm border">

        <h2 className="text-xl font-semibold">
          Sensor Contribution
        </h2>

        <div className="mt-5 space-y-3">

          <div className="flex justify-between">
            <span>Radar</span>
            <span>61%</span>
          </div>

          <div className="flex justify-between">
            <span>Thermal</span>
            <span>39%</span>
          </div>

          <div className="flex justify-between">
            <span>Acoustic</span>
            <span>0%</span>
          </div>

        </div>

      </div>

      {/* Quantum Optimization */}
      <div className="rounded-xl bg-white p-6 shadow-sm border">

        <h2 className="text-xl font-semibold">
          Quantum Optimization
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">
              Optimizer
            </p>

            <p className="font-medium">
              QuantumNow QIEO
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Fusion Strategy
            </p>

            <p className="font-medium">
              Adaptive Weighted Fusion
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Inference Time
            </p>

            <p className="font-medium">
              0.18 sec
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Optimization Status
            </p>

            <p className="font-medium text-green-600">
              Completed
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Prediction;
