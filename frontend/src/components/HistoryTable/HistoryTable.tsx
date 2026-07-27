type HistoryItem = {
  id: number;
  prediction: string;
  confidence: number;
  sensor: string;
  filename: string;
};

type Props = {
  data: HistoryItem[];
};

const HistoryTable = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">#</th>
            <th className="text-left py-3">File</th>
            <th className="text-left py-3">Prediction</th>
            <th className="text-left py-3">Confidence</th>
            <th className="text-left py-3">Sensor</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-4">{item.id}</td>
              <td>{item.filename}</td>
              <td>{item.prediction}</td>
              <td>{item.confidence}%</td>
              <td>{item.sensor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;