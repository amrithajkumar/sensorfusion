import {
  Cpu,
  Radar,
  Thermometer,
  Mic,
  BrainCircuit,
  Target,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import StatusBadge from "../../components/common/StatusBadge";

const Quantum = () => {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Quantum intelligence"
        description="The UI terminology now uses BQPhy Quantum-Inspired Optimization while leaving the backend implementation untouched."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <Cpu className="h-7 w-7 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">
              BQPhy Quantum-Inspired Optimization
            </h2>
          </div>

          <div className="space-y-4 text-sm text-slate-400">
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
              <span>Algorithm</span>
              <span className="font-medium text-white">BQPhy Quantum-Inspired Optimization</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
              <span>Optimization</span>
              <span className="font-medium text-white">Adaptive Weighted Fusion</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
              <span>Status</span>
              <StatusBadge status="success" text="Active" />
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-7 w-7 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Sensor fusion flow</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-slate-300"><Radar className="h-5 w-5 text-cyan-400" />Radar feature extraction</div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-slate-300"><Thermometer className="h-5 w-5 text-orange-400" />Thermal analysis</div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-slate-300"><Mic className="h-5 w-5 text-violet-400" />Acoustic classification</div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-slate-300"><Cpu className="h-5 w-5 text-cyan-400" />Quantum optimization</div>
          </div>
        </Card>
      </div>

      <Card className="space-y-5">
        <h2 className="text-xl font-semibold text-white">Detection pipeline</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-5 text-center"><Radar className="h-8 w-8 text-cyan-400" /><p className="text-sm font-medium text-white">Radar</p></div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-5 text-center"><Thermometer className="h-8 w-8 text-orange-400" /><p className="text-sm font-medium text-white">Thermal</p></div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-5 text-center"><Mic className="h-8 w-8 text-violet-400" /><p className="text-sm font-medium text-white">Acoustic</p></div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-5 text-center"><Cpu className="h-8 w-8 text-cyan-400" /><p className="text-sm font-medium text-white">Fusion</p></div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-center"><Target className="h-8 w-8 text-green-400" /><p className="text-sm font-medium text-green-300">Prediction</p></div>
        </div>
      </Card>
    </div>
  );
};

export default Quantum;
