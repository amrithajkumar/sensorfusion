const Quantum = () => {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-2">
        Quantum Intelligence
      </h1>

      <p className="text-gray-500 mb-8">
        AI-powered adaptive multi-sensor fusion using Quantum Inspired
        Evolutionary Optimization (QIEO).
      </p>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Quantum Optimizer
          </h2>

          <p className="text-gray-700 leading-8">
            <strong>Algorithm:</strong> QIEO
            <br />
            <strong>Optimization:</strong> Adaptive Weighted Fusion
            <br />
            <strong>Status:</strong>{" "}
            <span className="text-green-600 font-semibold">
              Active
            </span>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Sensor Fusion
          </h2>

          <ul className="space-y-2 text-gray-700">
            <li>📡 Radar Feature Extraction</li>
            <li>🌡 Thermal Analysis</li>
            <li>🎤 Acoustic Classification</li>
            <li>🧠 Adaptive Weighted Fusion</li>
            <li>⚛ Quantum Optimization</li>
          </ul>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          Detection Pipeline
        </h2>

        <div className="grid md:grid-cols-5 gap-4 text-center">

          <div className="bg-gray-100 rounded-lg p-4">
            📡
            <br />
            Radar
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            🌡
            <br />
            Thermal
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            🎤
            <br />
            Acoustic
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            ⚛
            <br />
            Quantum Fusion
          </div>

          <div className="bg-green-100 rounded-lg p-4">
            🎯
            <br />
            Prediction
          </div>

        </div>

      </div>
    </div>
  );
};

export default Quantum;
