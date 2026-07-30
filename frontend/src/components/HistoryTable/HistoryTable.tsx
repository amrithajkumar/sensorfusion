import Card from "../common/Card";

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
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-950/60">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.2em] text-slate-500">#</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.2em] text-slate-500">File</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Prediction</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Confidence</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Sensor</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800 bg-slate-900">
            {data.map((item) => (
              <tr key={item.id} className="transition hover:bg-slate-950/50">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">{item.id}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white">{item.filename}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{item.prediction}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-cyan-300">{item.confidence}%</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{item.sensor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default HistoryTable;