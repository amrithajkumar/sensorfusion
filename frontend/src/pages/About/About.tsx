import { Cpu, Radar, Thermometer, Mic, CircleCheck } from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import StatusBadge from "../../components/common/StatusBadge";

const About = () => {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="About QuantumFusion"
        description="A compact enterprise interface for multi-sensor drone detection with deterministic backend behavior."
      />

      <Card className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Project overview</h2>

            <p className="max-w-3xl text-sm leading-7 text-slate-400">
              QuantumFusion combines Radar, Thermal and Acoustic sensor data with machine learning and BQPhy Quantum-Inspired Optimization to improve drone detection accuracy.
            </p>

            <div className="flex flex-wrap gap-2">
              <StatusBadge status="success" text="React + TypeScript" />
              <StatusBadge status="warning" text="Tailwind CSS v4" />
              <StatusBadge status="success" text="FastAPI backend" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Technology stack
            </h3>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-300">
                <Cpu className="h-5 w-5 text-cyan-400" />
                React + TypeScript
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-300">
                <Radar className="h-5 w-5 text-cyan-400" />
                Multi-sensor fusion
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-300">
                <Thermometer className="h-5 w-5 text-orange-400" />
                Thermal analysis
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-300">
                <Mic className="h-5 w-5 text-violet-400" />
                Acoustic classification
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
            <h3 className="text-xl font-semibold text-white">Workflow</h3>

            <ol className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3"><CircleCheck className="mt-0.5 h-4 w-4 text-green-400" />Upload sensor files.</li>
              <li className="flex items-start gap-3"><CircleCheck className="mt-0.5 h-4 w-4 text-green-400" />Extract features.</li>
              <li className="flex items-start gap-3"><CircleCheck className="mt-0.5 h-4 w-4 text-green-400" />Perform adaptive sensor fusion.</li>
              <li className="flex items-start gap-3"><CircleCheck className="mt-0.5 h-4 w-4 text-green-400" />Optimize using BQPhy Quantum-Inspired Optimization.</li>
              <li className="flex items-start gap-3"><CircleCheck className="mt-0.5 h-4 w-4 text-green-400" />Generate final prediction.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
            <h3 className="text-xl font-semibold text-white">Design principles</h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>Minimal, high-contrast interface with a focused dark surface.</li>
              <li>Reusable cards and headers instead of repeated custom containers.</li>
              <li>Responsive layouts that collapse cleanly from desktop to mobile.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;