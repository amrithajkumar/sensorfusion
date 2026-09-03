import { Cpu, Radar, Thermometer, Mic, CircleCheck, Atom, Layers } from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import StatusBadge from "../../components/common/StatusBadge";

const About = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <SectionHeader
        title="About Quantum Sentinel"
        description="Core architecture, engineering principles, and technology stack powering the quantum-optimized multi-sensor intelligence platform."
      />

      <Card className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Project Overview</h2>

            <p className="text-sm leading-relaxed text-slate-300">
              <strong>QUANTUM SENTINEL</strong> is an enterprise intelligence platform that addresses the vulnerabilities of single-modality aerial surveillance. By fusing 77GHz FMCW radar micro-Doppler signals, FLIR infrared thermal imagery, and acoustic harmonic propeller frequencies, the system reliably identifies low-signature stealth drones.
            </p>

            <p className="text-sm leading-relaxed text-slate-400">
              Sensor fusion weights are optimized mathematically on-the-fly using <strong>BosonQ BQPhy Quantum-Inspired Evolutionary Optimization (QIEO)</strong>, maximizing target detection confidence while minimizing false alarm rates in adverse weather and high-clutter environments.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <StatusBadge status="success" text="BosonQ BQPhy QIEO" />
              <StatusBadge status="success" text="Multi-Modal Sensor Fusion" />
              <StatusBadge status="success" text="FastAPI Asynchronous Backend" />
              <StatusBadge status="success" text="React 19 + TypeScript + Tailwind" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Core Technology Stack
            </h3>

            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-3 text-slate-200">
                <Atom className="h-5 w-5 text-violet-400 shrink-0" />
                <span>BosonQ BQPhy Optimizer</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-3 text-slate-200">
                <Radar className="h-5 w-5 text-cyan-400 shrink-0" />
                <span>77GHz FMCW Radar Extractor</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-3 text-slate-200">
                <Thermometer className="h-5 w-5 text-orange-400 shrink-0" />
                <span>OpenCV Thermal Extractor</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-3 text-slate-200">
                <Mic className="h-5 w-5 text-violet-400 shrink-0" />
                <span>Librosa Acoustic Extractor</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-3 text-slate-200">
                <Cpu className="h-5 w-5 text-amber-400 shrink-0" />
                <span>Scikit-Learn Random Forests</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-3 text-slate-200">
                <Layers className="h-5 w-5 text-green-400 shrink-0" />
                <span>Adaptive Fusion Normalizer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 space-y-3">
            <h3 className="text-base font-bold text-white">Detection Workflow</h3>

            <ol className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CircleCheck className="mt-0.5 h-4 w-4 text-cyan-400 shrink-0" />
                <span><strong>Multi-Modal Ingestion:</strong> Ingests raw FMCW radar matrices, thermal images, and acoustic WAV streams.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheck className="mt-0.5 h-4 w-4 text-cyan-400 shrink-0" />
                <span><strong>Mathematical Feature Extraction:</strong> Extracts 148 combined spectral, statistical, and texture features.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheck className="mt-0.5 h-4 w-4 text-cyan-400 shrink-0" />
                <span><strong>Independent AI Inference:</strong> Evaluates independent classification probabilities across sensors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheck className="mt-0.5 h-4 w-4 text-violet-400 shrink-0" />
                <span><strong>BQPhy Quantum Optimization:</strong> Solves optimal multi-objective sensor reliability weights via QIEO.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheck className="mt-0.5 h-4 w-4 text-green-400 shrink-0" />
                <span><strong>Threat Assessment & Action:</strong> Synthesizes unified classification, confidence score, and operational action.</span>
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 space-y-3">
            <h3 className="text-base font-bold text-white">Design & Ethics Principles</h3>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Empirical Transparency:</strong> The platform never fabricates detection accuracy, GPS coordinates, or quantum gains. All values reflect measured model runs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Clear Distinction:</strong> Single-prediction confidence is strictly distinguished from benchmark test dataset accuracy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Graceful Failure Handling:</strong> If a sensing channel suffers interference or goes offline, the fusion engine dynamically re-normalizes weights across remaining active sensors.</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;