import { useEffect, useRef, useState } from "react";
import { Mic, UploadCloud, Play, Pause } from "lucide-react";

interface AcousticConsoleProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
  isDetected: boolean;
  probability?: number;
}

export function AcousticConsole({
  file,
  onFileSelect,
  isAnalyzing,
  isDetected,
  probability,
}: AcousticConsoleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // When file changes, create object URL for actual audio playback
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setIsPlaying(false);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setAudioUrl(null);
      setIsPlaying(false);
    }
  }, [file]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;

      const src = ctx.createMediaElementSource(audio);
      src.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = src;
    }

    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  // Canvas Waveform & Frequency Bar Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const renderAcoustic = () => {
      if (!running) return;

      const w = canvas.width;
      const h = canvas.height;

      // Dark background
      ctx.fillStyle = "rgba(10, 8, 24, 0.35)";
      ctx.fillRect(0, 0, w, h);

      // Grid guidelines
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
      ctx.lineWidth = 1;
      for (let y = 20; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (analyserRef.current && isPlaying) {
        // Real Web Audio FFT spectrum bars
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        const barWidth = (w / bufferLength) * 1.6;
        let x = 4;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * (h - 24);

          const grad = ctx.createLinearGradient(0, h, 0, h - barHeight);
          grad.addColorStop(0, "rgba(139, 92, 246, 0.2)");
          grad.addColorStop(1, "rgba(167, 139, 250, 0.9)");

          ctx.fillStyle = grad;
          ctx.fillRect(x, h - barHeight - 12, barWidth - 2, barHeight);
          x += barWidth;
        }
      } else {
        // Ambient / Analyzing Waveform visualization
        const time = Date.now() * 0.003;
        const amplitude = isAnalyzing ? 30 : file ? 14 : 5;

        ctx.strokeStyle = isAnalyzing
          ? "rgba(167, 139, 250, 0.9)"
          : file
            ? "rgba(139, 92, 246, 0.6)"
            : "rgba(139, 92, 246, 0.25)";
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < w; x++) {
          const wave1 = Math.sin(x * 0.05 + time) * amplitude;
          const wave2 = Math.sin(x * 0.12 - time * 1.5) * (amplitude * 0.4);
          const y = h / 2 + wave1 + wave2;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(renderAcoustic);
    };

    renderAcoustic();

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, isAnalyzing, file]);

  return (
    <div className="flex flex-col rounded-2xl border border-violet-500/30 bg-slate-950/80 overflow-hidden shadow-lg shadow-violet-950/20">
      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Mic className="h-4 w-4 text-violet-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Acoustic Workspace
          </span>
        </div>
        <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-mono text-violet-300 border border-violet-500/20">
          Harmonic Audio
        </span>
      </div>

      {/* Visualizer & Audio Player Container */}
      <div className="relative flex flex-col items-center justify-center p-4 bg-slate-950 space-y-3">
        <canvas
          ref={canvasRef}
          width={280}
          height={180}
          className="w-full rounded-xl border border-violet-500/20 bg-slate-950/90"
        />

        {/* Embedded Audio Element */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        )}

        {/* Playback Controls & Status */}
        <div className="w-full flex items-center justify-between px-2 text-xs">
          <div className="flex items-center gap-2">
            {audioUrl ? (
              <button
                type="button"
                onClick={togglePlay}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-500 text-slate-950 font-bold hover:bg-violet-400 transition text-[11px]"
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                <span>{isPlaying ? "Pause Stream" : "Listen Audio"}</span>
              </button>
            ) : (
              <span className="text-slate-500 text-[11px]">Audio stream idle</span>
            )}
          </div>

          <span className="font-mono text-[10px] text-violet-300">
            {isPlaying
              ? "FFT SPECTRUM: LIVE"
              : isAnalyzing
                ? "EXTRACTING MFCC/PITCH"
                : isDetected && probability
                  ? `HARMONIC LOCK: ${(probability * 100).toFixed(0)}%`
                  : file
                    ? "AUDIO LOADED (READY)"
                    : "AWAITING WAV/MP3"}
          </span>
        </div>
      </div>

      {/* File Ingestion & Telemetry */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-900/40">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Audio Capture (.wav):</span>
          {file ? (
            <span className="font-mono text-violet-300 font-semibold truncate max-w-[140px]">
              {file.name}
            </span>
          ) : (
            <span className="text-slate-500 italic">No capture loaded</span>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".wav,.mp3"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileSelect(f);
          }}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-violet-500/40 bg-violet-950/20 text-xs font-semibold text-violet-300 hover:bg-violet-950/40 transition"
        >
          <UploadCloud className="h-4 w-4" />
          <span>{file ? "Change Acoustic File" : "Load Audio File (.wav)"}</span>
        </button>

        <p className="text-[10px] text-slate-500 leading-tight text-center">
          Acoustic Spectrum Analyzer &bull; Propeller Harmonic Audio Stream
        </p>
      </div>
    </div>
  );
}
