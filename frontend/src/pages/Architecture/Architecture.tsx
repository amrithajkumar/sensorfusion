import { useState } from "react";
import {
  Layers,
  Radio,
  Cpu,
  Atom,
  Target,
  ArrowDown,
  ExternalLink,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import { Link } from "react-router-dom";

interface PipelineStage {
  id: string;
  number: string;
  name: string;
  icon: typeof Radio;
  color: string;
  summary: string;
  details: string[];
  techStack: string[];
  moduleLink?: string;
}

const STAGES: PipelineStage[] = [
  {
    id: "sensors",
    number: "01",
    name: "Multi-Modal Sensor Array",
    icon: Radio,
    color: "text-cyan-400",
    summary: "Captures three complementary physical signatures of aerial targets.",
    details: [
      "Radar Channel: 77GHz FMCW radar capturing micro-Doppler radar matrix signatures.",
      "Thermal Channel: Infrared camera frames detecting motor and battery heat signatures.",
      "Acoustic Channel: Audio microphone capturing propeller harmonic audio frequencies.",
    ],
    techStack: ["FMCW 77GHz", "FLIR Infrared", "Omnidirectional Microphones"],
    moduleLink: "/analysis",
  },
  {
    id: "features",
    number: "02",
    name: "Feature Extraction Pipeline",
    icon: Layers,
    color: "text-blue-400",
    summary: "Translates raw multi-modal signals into structured numerical feature vectors.",
    details: [
      "Radar Extractor: 18 features (statistical moments, energy, skew, kurtosis, FFT dominant frequencies).",
      "Thermal Extractor: 44 features (grayscale intensity, histogram moments, GLCM texture, LBP, edge density, entropy).",
      "Acoustic Extractor: 86 features (ZCR, RMS energy, spectral centroid, roll-off, contrast, MFCC-13, chroma, tonnetz).",
    ],
    techStack: ["Librosa", "OpenCV", "NumPy", "Scikit-Image", "Fast Fourier Transform (FFT)"],
    moduleLink: "/analysis",
  },
  {
    id: "classical-ai",
    number: "03",
    name: "Classical AI Classifiers",
    icon: Cpu,
    color: "text-amber-400",
    summary: "Domain-specific Random Forest models evaluate independent target probabilities.",
    details: [
      "Radar Random Forest: 200 estimators, depth 10, trained on SAAB SIRS radar dataset.",
      "Thermal Random Forest: Multi-class classifier identifying aircraft, birds, helicopters, and drones.",
      "Acoustic Random Forest: 200 estimators, depth 20, trained on drone acoustic audio recordings.",
      "Each model outputs a probability value [0.0 - 1.0] and local sensor reliability score.",
    ],
    techStack: ["Scikit-Learn", "Joblib", "Random Forest Classifier"],
    moduleLink: "/analytics",
  },
  {
    id: "bqphy",
    number: "04",
    name: "BQPhy Quantum Optimization",
    icon: Atom,
    color: "text-violet-400",
    summary: "Calculates the mathematically optimal sensor weight vector using Quantum-Inspired Evolutionary Optimization (QIEO).",
    details: [
      "Powered by BosonQ BQPhy SDK: Solves continuous multi-variable weight allocation under non-linear agreement and balance constraints.",
      "Population size: 40, Maximum generations: 100, 3 design variables [w_radar, w_thermal, w_acoustic].",
      "Outperforms classical random grid search by ~2-3% in objective score while executing in ~100-300 ms.",
    ],
    techStack: ["BosonQ BQPhy SDK", "QIEO Optimizer", "Python Native Interface"],
    moduleLink: "/quantum",
  },
  {
    id: "fusion",
    number: "05",
    name: "Adaptive Sensor Fusion Engine",
    icon: Layers,
    color: "text-cyan-300",
    summary: "Combines active sensor probabilities using normalized quantum weights.",
    details: [
      "Normalizes active weights: Sum(w_i) = 1.0 across available modalities.",
      "Computes fused score: S = Sum(w_i * p_i).",
      "Dynamic failover: If a sensor is missing or damaged, weights automatically re-normalize across remaining operational sensors.",
    ],
    techStack: ["SensorFusion Engine", "Dynamic Normalization", "FastAPI Backend"],
    moduleLink: "/fusion",
  },
  {
    id: "decision",
    number: "06",
    name: "Final Detection Decision",
    icon: Target,
    color: "text-green-400",
    summary: "Synthesizes final target classification, threat level, and actionable command instructions.",
    details: [
      "Binary classification threshold: S >= 0.50 triggers 'Drone' detection; otherwise 'No Drone' / 'Area Clear'.",
      "Calculates threat level (CRITICAL >= 90%, HIGH >= 75%, MEDIUM >= 50%, LOW < 50%).",
      "Issues recommended operational instructions to command station.",
    ],
    techStack: ["Threat Matrix Engine", "Operational Dispatcher"],
    moduleLink: "/prediction",
  },
];

function Architecture() {
  const [selectedStage, setSelectedStage] = useState<PipelineStage>(STAGES[3]);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="System Architecture & Pipeline"
        description="End-to-end technical execution flow of the Quantum Sentinel multi-sensor drone detection system."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Interactive Vertical Pipeline Blocks */}
        <div className="lg:col-span-5 space-y-2.5">
          {STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const isSelected = selectedStage.id === stage.id;

            return (
              <div key={stage.id} className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedStage(stage)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? "border-cyan-500/50 bg-cyan-950/30 shadow-lg shadow-cyan-950/40"
                      : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      {stage.number}
                    </span>
                    <Icon className={`h-5 w-5 ${stage.color}`} />
                    <div>
                      <h4 className="font-semibold text-sm text-white">
                        {stage.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {stage.summary}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`h-2 w-2 rounded-full ${
                      isSelected ? "bg-cyan-400" : "bg-transparent"
                    }`}
                  />
                </button>

                {index < STAGES.length - 1 && (
                  <div className="flex justify-center py-0.5 text-slate-600">
                    <ArrowDown className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stage Detailed Inspector Card */}
        <div className="lg:col-span-7">
          <Card className="sticky top-28 border-slate-800 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  STAGE {selectedStage.number} SPECIFICATION
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedStage.name}
                </h3>
              </div>
              <selectedStage.icon className={`h-8 w-8 ${selectedStage.color}`} />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedStage.summary}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Technical Execution Details
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedStage.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Technologies & Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedStage.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {selectedStage.moduleLink && (
              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <Link
                  to={selectedStage.moduleLink}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  <span>Open Related Module</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Architecture;
