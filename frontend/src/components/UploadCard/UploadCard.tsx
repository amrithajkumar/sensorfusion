import { type ChangeEvent, type ReactNode, useRef } from "react";
import { CircleCheck, FileUp } from "lucide-react";

type UploadCardProps = {
  title: string;
  icon: ReactNode;
  acceptedFile: string;
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
};

function UploadCard({
  title,
  icon,
  acceptedFile,
  selectedFile,
  onFileSelect,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onFileSelect(file);

    // Allows selecting the same file again
    event.target.value = "";
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCardClick}
        aria-label={`Upload ${title} file`}
        className="group flex h-full min-h-[240px] w-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left transition-all duration-200 hover:border-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 text-cyan-400">
            <span className="text-3xl">{icon}</span>
          </div>

          <span className="rounded-full border border-slate-800 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400 transition group-hover:border-cyan-500/40 group-hover:text-cyan-300">
            {acceptedFile}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Select a {title.toLowerCase()} capture to include in the fusion run.
            </p>
          </div>

          {selectedFile ? (
            <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
              <CircleCheck className="h-5 w-5 shrink-0 text-green-400" />

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-green-300">
                  File selected
                </p>

                <p className="truncate text-sm font-medium text-white">
                  {selectedFile.name}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-400 transition group-hover:border-cyan-500/50 group-hover:text-slate-300">
              <FileUp className="h-5 w-5 shrink-0" />

              <p className="text-sm">Click to upload or drag and drop</p>
            </div>
          )}
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedFile}
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}

export default UploadCard;
