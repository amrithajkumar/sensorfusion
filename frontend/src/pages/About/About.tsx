const About = () => {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-2">
        About QuantumFusion
      </h1>

      <p className="text-gray-500 mb-8">
        AI-powered adaptive drone detection using multi-sensor fusion.
      </p>

      <div className="bg-white rounded-xl shadow-md p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Project Overview
        </h2>

        <p className="text-gray-700 leading-8">
          QuantumFusion combines Radar, Thermal and Acoustic sensor data
          with Machine Learning and Quantum Inspired Evolutionary
          Optimization (QIEO) to improve drone detection accuracy.
        </p>

        <div className="mt-8">

          <h3 className="text-xl font-semibold mb-4">
            Technology Stack
          </h3>

          <ul className="space-y-2">

            <li>⚛ React + TypeScript</li>

            <li>🎨 Tailwind CSS</li>

            <li>🚀 FastAPI</li>

            <li>🤖 Machine Learning (Random Forest)</li>

            <li>⚛ Quantum Inspired Optimization (QIEO)</li>

          </ul>

        </div>

        <div className="mt-8">

          <h3 className="text-xl font-semibold mb-4">
            Workflow
          </h3>

          <ol className="list-decimal ml-6 space-y-2">

            <li>Upload sensor files.</li>

            <li>Extract features.</li>

            <li>Perform adaptive sensor fusion.</li>

            <li>Optimize using QIEO.</li>

            <li>Generate final prediction.</li>

          </ol>

        </div>

      </div>

    </div>
  );
};

export default About;