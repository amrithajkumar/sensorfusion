import { useEffect, useState } from "react";
import HistoryTable from "../../components/HistoryTable/HistoryTable";
import SectionHeader from "../../components/common/SectionHeader";
import { getHistory } from "../../services/historyService";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getHistory();

        const formatted = data.map((item: any, index: number) => ({
          id: index + 1,
          filename: item.filename,
          prediction: item.prediction,
          confidence: (item.confidence * 100).toFixed(1),
          sensor: item.sensor,
        }));

        setHistory(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Prediction history"
        description="Previous prediction records from the existing backend history endpoint."
      />

      <HistoryTable data={history} />
    </div>
  );
};

export default History;