import { useEffect, useRef } from "react";
import { Radar, UploadCloud } from "lucide-react";

interface RadarConsoleProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
  isDetected: boolean;
  probability?: number;
}

export function RadarConsole({
  file,
  onFileSelect,
  isAnalyzing,
  isDetected,
  probability,
}: RadarConsoleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const angleRef = useRef(0);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Radar sweep animation on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const renderRadar = () => {
      if (!running) return;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) - 14;

      // Dark tactical scope background with slight fade trail
      ctx.fillStyle = "rgba(6, 12, 24, 0.22)";
      ctx.fillRect(0, 0, w, h);

      // Radar Concentric Range Rings (1km to 5km)
      ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
      ctx.lineWidth = 1;

      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius * i) / 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Outer Perimeter Ring
      ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshairs & Cardinal Azimuth Lines
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Range Labels
      ctx.fillStyle = "rgba(6, 182, 212, 0.5)";
      ctx.font = "9px monospace";
      ctx.fillText("1.25km", cx + (radius * 1) / 4 + 2, cy - 3);
      ctx.fillText("2.50km", cx + (radius * 2) / 4 + 2, cy - 3);
      ctx.fillText("3.75km", cx + (radius * 3) / 4 + 2, cy - 3);
      ctx.fillText("5.00km", cx + radius - 36, cy - 3);

      // Sweep Beam (Rotating sector)
      angleRef.current += isAnalyzing ? 0.06 : 0.025;
      if (angleRef.current >= Math.PI * 2) angleRef.current -= Math.PI * 2;

      const currentAngle = angleRef.current;
      const sweepGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      sweepGradient.addColorStop(0, "rgba(6, 182, 212, 0.4)");
      sweepGradient.addColorStop(1, "rgba(6, 182, 212, 0.0)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, currentAngle - 0.35, currentAngle);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      // Leading Sweep Line
      ctx.strokeStyle = "rgba(34, 211, 238, 0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(currentAngle) * radius,
        cy + Math.sin(currentAngle) * radius
      );
      ctx.stroke();
      ctx.restore();

      // Simulated Target Blip if detected or analyzing
      if (isDetected && probability && probability > 0.05) {
        // Compute position based on azimuth 45 degrees, 3.2km range
        const blipDist = radius * 0.65;
        const blipAngle = Math.PI * 0.28;
        const bx = cx + Math.cos(blipAngle) * blipDist;
        const by = cy - Math.sin(blipAngle) * blipDist;

        // Blip glow
        ctx.fillStyle = "rgba(239, 68, 68, 0.85)";
        ctx.beginPath();
        ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Target marker ring
        ctx.strokeStyle = "rgba(239, 68, 68, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bx, by, 9, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#fca5a5";
        ctx.font = "bold 9px monospace";
        ctx.fillText("UAV-BLIP", bx + 12, by + 3);
      }

      animFrameRef.current = requestAnimationFrame(renderRadar);
    };

    renderRadar();

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAnalyzing, isDetected, probability]);

  return (
    <div className="flex flex-col rounded-2xl border border-cyan-500/30 bg-slate-950/80 overflow-hidden shadow-lg shadow-cyan-950/20">
      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Radar className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Radar Workspace
          </span>
        </div>
        <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-cyan-500/20">
          77GHz FMCW
        </span>
      </div>

      {/* Radar Scope Display */}
      <div className="relative flex items-center justify-center p-4 bg-slate-950">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="rounded-full border border-cyan-500/20 shadow-inner"
        />

        {/* Scope Status Badge Overlay */}
        <div className="absolute top-6 left-6 text-[10px] font-mono text-cyan-400/80">
          {isAnalyzing
            ? "SCAN: 360° BEAM SWEEP"
            : isDetected
              ? "TRACK: TARGET ACQUIRED"
              : "IDLE: SURVEILLANCE STANDBY"}
        </div>
      </div>

      {/* File Ingestion & Telemetry */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-900/40">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Input Signal (.npy):</span>
          {file ? (
            <span className="font-mono text-cyan-300 font-semibold truncate max-w-[140px]">
              {file.name}
            </span>
          ) : (
            <span className="text-slate-500 italic">No capture loaded</span>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".npy"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileSelect(f);
          }}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-cyan-500/40 bg-cyan-950/20 text-xs font-semibold text-cyan-300 hover:bg-cyan-950/40 transition"
        >
          <UploadCloud className="h-4 w-4" />
          <span>{file ? "Change Radar File" : "Load Radar Capture (.npy)"}</span>
        </button>

        <p className="text-[10px] text-slate-500 leading-tight text-center">
          Radar Detection Visualization &bull; Derived from FMCW Micro-Doppler Matrix
        </p>
      </div>
    </div>
  );
}
