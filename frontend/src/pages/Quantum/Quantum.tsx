import SectionHeader from "../../components/common/SectionHeader";
import OptimizationPipeline from "../../components/OptimizationPipeline";
import OptimizerCard from "../../components/OptimizerCard";
import OptimizationGain from "../../components/OptimizationGain";
import PredictionSummary from "../../components/PredictionSummary";

const prediction = JSON.parse(
  localStorage.getItem("latestPrediction") || "{}"
);

const quantum = prediction.quantum || {};
const classical = prediction.classical || {};
const comparison = prediction.comparison || {};

const quantumWeights = [
  {
    name: "Radar",
    value: Number(((quantum.weights?.radar ?? 0) * 100).toFixed(1)),
  },
  {
    name: "Thermal",
    value: Number(((quantum.weights?.thermal ?? 0) * 100).toFixed(1)),
  },
  {
    name: "Acoustic",
    value: Number(((quantum.weights?.acoustic ?? 0) * 100).toFixed(1)),
  },
];

const classicalWeights = [
  {
    name: "Radar",
    value: Number(((classical.weights?.radar ?? 0) * 100).toFixed(1)),
  },
  {
    name: "Thermal",
    value: Number(((classical.weights?.thermal ?? 0) * 100).toFixed(1)),
  },
  {
    name: "Acoustic",
    value: Number(((classical.weights?.acoustic ?? 0) * 100).toFixed(1)),
  },
];

function Quantum() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Quantum AI"
        description="Compare Classical Fusion with BQPhy Quantum Optimization."
      />

      <OptimizationPipeline />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <OptimizerCard
          variant="classical"
          title="Classical Optimization"
          subtitle="Weighted Fusion"

          runtime={Number(
            ((classical.runtime_seconds ?? 0) * 1000).toFixed(1)
          )}

          fusionScore={Number(
            (classical.score ?? 0).toFixed(4)
          )}

          confidence={Number(
            ((prediction.confidence ?? 0) * 100).toFixed(1)
          )}

          weights={classicalWeights}
        />

        <OptimizerCard
          variant="quantum"
          title="BQPhy Quantum Optimization"
          subtitle="Quantum-Inspired Adaptive Fusion"

          runtime={Number(
            ((quantum.runtime_seconds ?? 0) * 1000).toFixed(1)
          )}

          fusionScore={Number(
            (quantum.score ?? 0).toFixed(4)
          )}

          confidence={Number(
            ((prediction.confidence ?? 0) * 100).toFixed(1)
          )}

          weights={quantumWeights}
        />

      </div>

      <OptimizationGain
        runtime={Number(
          (comparison.quantum_improvement_percent ?? 0).toFixed(2)
        )}

        fusion={Number(
          (
            ((quantum.score ?? 0) -
              (classical.score ?? 0)) *
            100
          ).toFixed(2)
        )}

        confidence={Number(
          ((prediction.confidence ?? 0) * 100).toFixed(1)
        )}
      />

      <PredictionSummary
        label={prediction.prediction ?? "Unknown"}

        confidence={Number(
          ((prediction.confidence ?? 0) * 100).toFixed(1)
        )}

        threat={prediction.threat_level ?? "LOW"}
      />
    </div>
  );
}

export default Quantum;