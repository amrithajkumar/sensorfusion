type SensorStatusProps = {
  radarFile: File | null;
  thermalFile: File | null;
  acousticFile: File | null;
};

function SensorStatus({
  radarFile,
  thermalFile,
  acousticFile,
}: SensorStatusProps) {
  return (
    <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">
        Sensor Status
      </h3>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">
          <span>📡 Radar</span>

          {radarFile ? (
            <span className="text-green-600 font-medium">
              {radarFile.name}
            </span>
          ) : (
            <span className="text-red-500">
              Not Uploaded
            </span>
          )}
        </div>

        <div className="flex justify-between">
          <span>🌡️ Thermal</span>

          {thermalFile ? (
            <span className="text-green-600 font-medium">
              {thermalFile.name}
            </span>
          ) : (
            <span className="text-red-500">
              Not Uploaded
            </span>
          )}
        </div>

        <div className="flex justify-between">
          <span>🎙️ Acoustic</span>

          {acousticFile ? (
            <span className="text-green-600 font-medium">
              {acousticFile.name}
            </span>
          ) : (
            <span className="text-red-500">
              Not Uploaded
            </span>
          )}
        </div>

      </div>
    </div>
  );
}

export default SensorStatus;