import { useState, useRef, useEffect } from "react";
import { Thermometer, UploadCloud, Crosshair } from "lucide-react";

interface ThermalConsoleProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
  isDetected: boolean;
  probability?: number;
}

type ColorPalette = "ironbow" | "whitehot" | "rainbow";

export function ThermalConsole({
  file,
  onFileSelect,
  isAnalyzing,
  isDetected,
  probability,
}: ThermalConsoleProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<ColorPalette>("ironbow");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // When file is selected, generate object URL to display the actual uploaded thermal frame
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImageUrl(null);
    }
  }, [file]);

  // CSS filter styles to authentically simulate thermal optical palettes on the real frame
  const getFilterStyle = () => {
    switch (palette) {
      case "whitehot":
        return "grayscale(100%) contrast(150%)";
      case "rainbow":
        return "hue-rotate(240deg) saturate(220%) contrast(140%)";
      case "ironbow":
      default:
        // Ironbow effect: high contrast with warm amber/magenta/violet hue
        return "contrast(140%) saturate(180%) sepia(50%) hue-rotate(-25deg)";
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-orange-500/30 bg-slate-950/80 overflow-hidden shadow-lg shadow-orange-950/20">
      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-orange-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Thermal Workspace
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              setPalette(
                palette === "ironbow"
                  ? "whitehot"
                  : palette === "whitehot"
                    ? "rainbow"
                    : "ironbow"
              )
            }
            className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-mono text-orange-300 border border-orange-500/20 hover:bg-orange-500/20 transition uppercase"
          >
            {palette}
          </button>
        </div>
      </div>

      {/* Radiometric Frame Display Container */}
      <div className="relative flex items-center justify-center p-4 bg-slate-950 min-h-[220px]">
        {imageUrl ? (
          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-orange-500/30 bg-black flex items-center justify-center">
            {/* Real Uploaded Frame */}
            <img
              src={imageUrl}
              alt="Thermal capture"
              className="w-full h-full object-contain transition-all duration-300"
              style={{ filter: getFilterStyle() }}
            />

            {/* Scanning Laser Reticle */}
            <div
              className={`absolute inset-x-0 h-0.5 bg-orange-400/80 shadow-[0_0_8px_rgba(251,146,60,0.8)] pointer-events-none ${
                isAnalyzing ? "animate-bounce" : "opacity-30"
              }`}
              style={{ animationDuration: "2s" }}
            />

            {/* Target Highlight Bounding Box when detected */}
            {(isDetected || isAnalyzing) && (
              <div className="absolute top-1/4 left-1/3 w-28 h-20 border-2 border-red-500/80 rounded-lg pointer-events-none flex flex-col justify-between p-1 bg-red-500/10">
                <div className="flex justify-between items-start text-[9px] font-mono text-red-300 font-bold">
                  <span>HEAT-BLOOM</span>
                  <Crosshair className="h-3 w-3 text-red-400 animate-spin" style={{ animationDuration: "6s" }} />
                </div>
                <div className="text-right text-[8px] font-mono text-red-200">
                  {probability ? `P: ${(probability * 100).toFixed(0)}%` : "VERIFYING"}
                </div>
              </div>
            )}

            {/* Radiometric Gradient Bar */}
            <div className="absolute right-2 top-3 bottom-3 w-2 rounded-full bg-gradient-to-t from-blue-600 via-orange-500 to-yellow-300 border border-black/40" />
          </div>
        ) : (
          <div className="w-full h-48 rounded-xl border border-dashed border-orange-500/20 flex flex-col items-center justify-center text-center p-4 text-slate-500 text-xs">
            <Thermometer className="h-8 w-8 text-orange-500/40 mb-2" />
            <span>Load FLIR infrared frame (.jpg / .png) to view radiometric heat signatures</span>
          </div>
        )}
      </div>

      {/* File Ingestion & Telemetry */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-900/40">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Thermal Frame:</span>
          {file ? (
            <span className="font-mono text-orange-300 font-semibold truncate max-w-[140px]">
              {file.name}
            </span>
          ) : (
            <span className="text-slate-500 italic">No capture loaded</span>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileSelect(f);
          }}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-orange-500/40 bg-orange-950/20 text-xs font-semibold text-orange-300 hover:bg-orange-950/40 transition"
        >
          <UploadCloud className="h-4 w-4" />
          <span>{file ? "Change Thermal Frame" : "Load Thermal Frame (.jpg)"}</span>
        </button>

        <p className="text-[10px] text-slate-500 leading-tight text-center">
          Thermal Infrared Radiometry &bull; FLIR Long-Wave IR Frame
        </p>
      </div>
    </div>
  );
}
