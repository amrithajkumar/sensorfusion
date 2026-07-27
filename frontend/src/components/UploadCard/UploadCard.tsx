import { type ChangeEvent, type ReactNode, useRef } from "react";

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
        className="flex h-[220px] w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md"
      >
        <span className="text-5xl">{icon}</span>

        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          {title}
        </h3>

        {selectedFile ? (
          <div className="mt-4 rounded-lg bg-green-50 px-4 py-2">
            <p className="text-sm font-medium text-green-700">
              ✓ {selectedFile.name}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            Click to upload or drag & drop
          </p>
        )}
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
