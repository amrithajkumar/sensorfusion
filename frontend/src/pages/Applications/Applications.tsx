import {
  ShieldAlert,
  Plane,
  Building2,
  Anchor,
  Factory,
  Bot,
  Trees,
  Cpu,
  Info,
  ArrowRight,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import { Link } from "react-router-dom";

const FUTURE_APPLICATIONS = [
  {
    title: "Airport Airspace & Runway Defense",
    icon: Plane,
    description:
      "Mitigates unauthorized drone incursions near approach corridors and terminal areas where RF spoofing and visual bird clutter cause false alarms.",
    benefits: "Combines acoustic propeller noise with FMCW radar to distinguish commercial UAVs from flocking birds.",
  },
  {
    title: "Perimeter & Base Security",
    icon: ShieldAlert,
    description:
      "24/7 automated stealth intrusion detection around military bases, government complexes, and border zones under fog, rain, or low-light.",
    benefits: "Thermal infrared verifies heat blooms while micro-Doppler radar isolates ground crawl and low-altitude hover.",
  },
  {
    title: "Critical Infrastructure Protection",
    icon: Building2,
    description:
      "Surveillance of nuclear power plants, power grid substations, oil refineries, and water reservoirs against targeted aerial reconnaissance.",
    benefits: "Zero-dependency physical sensing prevents cyber-spoofing of radar tracks.",
  },
  {
    title: "Maritime & Port Surveillance",
    icon: Anchor,
    description:
      "Detection of low-signature surface drones, autonomous watercraft (USVs), and contraband aerial couriers approaching vessels or harbors.",
    benefits: "Resilient against severe marine sea-clutter reflections and wave noise.",
  },
  {
    title: "Industrial Plant Safety & Monitoring",
    icon: Factory,
    description:
      "Hazardous chemical processing facilities and mining areas requiring early detection of gas leaks, rogue UAVs, or machinery acoustic anomalies.",
    benefits: "Thermal emission gradient tracking combined with localized acoustic signature analysis.",
  },
  {
    title: "Autonomous Robotics & Mobile Sentinels",
    icon: Bot,
    description:
      "Equipping autonomous ground patrol vehicles (UGVs) with low-SWaP multi-modal perception for 360-degree situational awareness.",
    benefits: "Ultra-fast BQPhy weight optimization operates within millisecond robotic control loops.",
  },
  {
    title: "Environmental & Wildlife Monitoring",
    icon: Trees,
    description:
      "Anti-poaching surveillance in wildlife sanctuaries and early detection of illegal motorized vehicles or low-altitude poaching drones.",
    benefits: "Passively operates with solar-powered acoustic/thermal sensor nodes without transmitting detectable radar emissions.",
  },
  {
    title: "Smart City Infrastructure",
    icon: Cpu,
    description:
      "Future urban air mobility (UAM) air-traffic corridors coordinating eVTOL vehicles, delivery drones, and emergency medical flights.",
    benefits: "Scalable multi-modal sensor fusion across distributed urban intersection nodes.",
  },
];

function Applications() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Mission Applications & Domain Roadmap"
        description="Current operational demonstration and potential future domain adaptations of the quantum multi-sensor architecture."
      />

      {/* Mandatory Disclaimer Box */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
        <div>
          <span className="font-bold text-amber-300">DOMAIN ADAPTATION NOTICE:</span>{" "}
          The current software release is trained and demonstrated specifically on <strong>drone detection datasets</strong> (FMCW radar, infrared aerial imagery, acoustic propeller harmonics). Applying this architecture to other domains requires appropriate domain-specific training data, feature engineering, and model adaptation.
        </div>
      </div>

      {/* Current Operational Demonstration Card */}
      <Card className="border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-300 border border-cyan-500/40 uppercase tracking-wider">
              Current Live Demonstration
            </span>
            <h3 className="text-xl font-bold text-white mt-2">
              Stealth UAV & Micro-Drone Aerial Defense
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Detects low-radar-cross-section (RCS) commercial and tactical quadcopters flying in complex urban or adverse environmental clutter by simultaneously verifying FMCW radar micro-Doppler returns, infrared thermal motor heat, and propeller acoustic harmonics.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/analysis"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
            >
              <span>Launch Live Analysis</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>

      {/* Potential Future Applications Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          POTENTIAL FUTURE APPLICATIONS
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {FUTURE_APPLICATIONS.map((app) => {
            const Icon = app.icon;
            return (
              <Card
                key={app.title}
                className="space-y-3 border-slate-800 bg-slate-900/40 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-white">
                    {app.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {app.description}
                </p>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-300 font-medium">
                  <span className="text-slate-500">Fusion Benefit: </span>
                  {app.benefits}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Applications;
