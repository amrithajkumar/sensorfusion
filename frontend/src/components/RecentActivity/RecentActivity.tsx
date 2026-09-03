import { useEffect, useState } from "react";
import Card from "../common/Card";
import { getHistory, type HistoryItem } from "../../services/api";
import { CircleCheck, CircleX } from "lucide-react";

function RecentActivity() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getHistory()
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          // Show latest entries first
          setItems(data.slice(-5).reverse());
        }
      })
      .catch(() => {
        // Fallback gracefully
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        <p className="mt-1 text-sm text-slate-400">
          Latest multi-sensor detections recorded by the platform.
        </p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="py-6 text-center text-xs text-slate-500">
            Loading recent history...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 p-6 text-center text-xs text-slate-500">
            No detections recorded yet. Run a detection above to start logging.
          </div>
        ) : (
          items.map((item, index) => {
            const isDrone = item.prediction.toLowerCase().includes("drone") && !item.prediction.toLowerCase().includes("no");
            const conf =
              item.confidence <= 1
                ? (item.confidence * 100).toFixed(1)
                : Number(item.confidence).toFixed(1);

            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  {isDrone ? (
                    <CircleCheck className="h-4 w-4 text-green-400" />
                  ) : (
                    <CircleX className="h-4 w-4 text-slate-400" />
                  )}
                  <div>
                    <span className="font-medium text-slate-200">
                      {item.prediction}
                    </span>
                    <span className="ml-2 text-xs text-slate-500">
                      ({item.sensor})
                    </span>
                  </div>
                </div>

                <span
                  className={`font-semibold ${
                    isDrone ? "text-cyan-400" : "text-slate-400"
                  }`}
                >
                  {conf}%
                </span>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

export default RecentActivity;