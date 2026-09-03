import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  Eye,
} from "lucide-react";
import Card from "../../components/common/Card";
import SectionHeader from "../../components/common/SectionHeader";
import { getHistory } from "../../services/historyService";
import { downloadAnalysisReport } from "../../utils/reportGenerator";

interface HistoryRecord {
  id: string;
  timestamp: string;
  location: string;
  sensor: string;
  prediction: string;
  confidence: number;
  quantumStatus: string;
  filename?: string;
  raw: any;
}

function History() {
  const [historyList, setHistoryList] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "drone" | "nodrone">("all");
  const [sensorFilter, setSensorFilter] = useState<"all" | "3sensors" | "2sensors">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getHistory()
      .then((data: any[]) => {
        if (!mounted) return;
        const mapped = data.map((item, idx) => {
          const rawConf = Number(item.confidence) || 0;
          const confNorm = rawConf <= 1 ? rawConf * 100 : rawConf;
          const isDrone = item.prediction?.toLowerCase().includes("drone") && !item.prediction?.toLowerCase().includes("no");

          return {
            id: `QS-HIST-${String(idx + 1).padStart(4, "0")}`,
            timestamp: item.timestamp || new Date().toISOString(),
            location: "Station Alpha (Perimeter)",
            sensor: item.sensor || "Radar + Thermal + Acoustic",
            prediction: isDrone ? "Drone" : "No Drone",
            confidence: confNorm,
            quantumStatus: "Optimized (QIEO)",
            filename: item.filename,
            raw: item,
          };
        });
        setHistoryList(mapped);
      })
      .catch((err) => {
        console.error("Failed to load history:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = historyList.filter((item) => {
    // Classification filter
    if (filterType === "drone" && item.prediction !== "Drone") return false;
    if (filterType === "nodrone" && item.prediction !== "No Drone") return false;

    // Sensor count filter
    if (sensorFilter === "3sensors" && !item.sensor.includes("+") && (item.sensor.split("+").length < 3)) return false;
    if (sensorFilter === "2sensors" && item.sensor.split("+").length >= 3) return false;

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.sensor.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const handleDownloadItemReport = (item: HistoryRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    downloadAnalysisReport({
      analysisId: item.id,
      timestamp: item.timestamp,
      monitoringLocation: item.location,
      coordinates: { lat: 28.6139, lng: 77.209 },
      prediction: {
        prediction: item.prediction,
        confidence: item.confidence / 100,
        detected: item.prediction === "Drone",
        fusion_score: item.confidence / 100,
        threat_level: item.prediction === "Drone" ? "CRITICAL" : "LOW",
        mission_status: item.prediction === "Drone" ? "THREAT DETECTED" : "AREA CLEAR",
        recommended_action: item.prediction === "Drone" ? "Track aerial vector" : "Normal sector surveillance",
      },
    });
  };

  const handleRowClick = (item: HistoryRecord) => {
    // Save to localStorage for instant view in Prediction & Map pages
    const reconstructed = {
      prediction: item.prediction,
      confidence: item.confidence / 100,
      detected: item.prediction === "Drone",
      fusion_score: item.confidence / 100,
      threat_level: item.prediction === "Drone" ? "CRITICAL" : "LOW",
      mission_status: item.prediction === "Drone" ? "THREAT DETECTED" : "AREA CLEAR",
      recommended_action: item.prediction === "Drone" ? "Track aerial vector" : "Normal sector surveillance",
    };
    localStorage.setItem("latestPrediction", JSON.stringify(reconstructed));
    navigate("/prediction", { state: reconstructed });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <SectionHeader
        title="Detection History Archive"
        description="Searchable, filterable audit archive of all previous multi-sensor detections and quantum optimization sessions."
      />

      {/* Filter and Search Bar */}
      <Card className="border-slate-800 bg-slate-900/40 p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by Analysis ID, sensor, or station..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              Class:
            </span>
            <button
              type="button"
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterType === "all"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800"
              }`}
            >
              All Results
            </button>
            <button
              type="button"
              onClick={() => setFilterType("drone")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterType === "drone"
                  ? "bg-red-500/20 text-red-300 border border-red-500/40 font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800"
              }`}
            >
              Drone
            </button>
            <button
              type="button"
              onClick={() => setFilterType("nodrone")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterType === "nodrone"
                  ? "bg-green-500/20 text-green-300 border border-green-500/40 font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800"
              }`}
            >
              No Drone
            </button>

            <span className="text-slate-500 ml-2 mr-1">Sensors:</span>
            <button
              type="button"
              onClick={() => setSensorFilter("all")}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition ${
                sensorFilter === "all"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setSensorFilter("3sensors")}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition ${
                sensorFilter === "3sensors"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800"
              }`}
            >
              3 Sensors
            </button>
            <button
              type="button"
              onClick={() => setSensorFilter("2sensors")}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition ${
                sensorFilter === "2sensors"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800"
              }`}
            >
              2 Sensors
            </button>
          </div>
        </div>
      </Card>

      {/* History Records Table */}
      <Card className="border-slate-800 bg-slate-900/40 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Analysis ID</th>
                <th className="py-3.5 px-4">Date / Time</th>
                <th className="py-3.5 px-4">Station Location</th>
                <th className="py-3.5 px-4">Sensors Modality</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4">Certainty</th>
                <th className="py-3.5 px-4">Quantum</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    Loading historical archive from database...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No matching detection records found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isDrone = item.prediction === "Drone";

                  return (
                    <tr
                      key={item.id}
                      onClick={() => handleRowClick(item)}
                      className="cursor-pointer hover:bg-slate-800/40 transition group"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                        {item.id}
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono">
                        {item.timestamp.slice(0, 19).replace("T", " ")}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {item.location}
                      </td>
                      <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                        {item.sensor}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            isDrone
                              ? "bg-red-500/20 text-red-300 border border-red-500/30"
                              : "bg-green-500/20 text-green-300 border border-green-500/30"
                          }`}
                        >
                          {item.prediction}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-white">
                        {item.confidence.toFixed(1)}%
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-violet-300 font-medium font-mono text-[11px]">
                          QIEO Active
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            title="View Full Result"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(item);
                            }}
                            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Download Report"
                            onClick={(e) => handleDownloadItemReport(item, e)}
                            className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700 transition"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default History;