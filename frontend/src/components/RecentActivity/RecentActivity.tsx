import Card from "../common/Card";

const history = [
  {
    prediction: "Drone",
    confidence: "96%",
  },
  {
    prediction: "No Drone",
    confidence: "91%",
  },
  {
    prediction: "Drone",
    confidence: "95%",
  },
  {
    prediction: "Drone",
    confidence: "93%",
  },
  {
    prediction: "No Drone",
    confidence: "89%",
  },
];

function RecentActivity() {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Latest detections performed by the platform.
        </p>

      </div>

      <div className="space-y-3">

        {history.map((item, index) => (

          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3"
          >
            <span className="text-slate-300">
              {item.prediction}
            </span>

            <span className="font-medium text-cyan-400">
              {item.confidence}
            </span>

          </div>

        ))}

      </div>

    </Card>
  );
}

export default RecentActivity;