import { useEffect, useState } from "react";
import HistoryTable from "../../components/HistoryTable/HistoryTable";
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
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-2">
        Prediction History
      </h1>

      <p className="text-gray-500 mb-8">
        Previous prediction records.
      </p>

      <HistoryTable data={history} />
    </div>
  );
};

export default History;