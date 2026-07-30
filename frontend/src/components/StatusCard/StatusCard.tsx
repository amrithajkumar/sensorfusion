import Card from "../common/Card";

type StatusCardProps = {
  title: string;
  value: string;
  status: "success" | "warning" | "error";
};

const statusStyles = {
  success: {
    dot: "bg-green-500",
    text: "text-green-400",
  },
  warning: {
    dot: "bg-amber-500",
    text: "text-amber-400",
  },
  error: {
    dot: "bg-red-500",
    text: "text-red-400",
  },
};

function StatusCard({ title, value, status }: StatusCardProps) {
  return (
    <Card className="h-full">

      <div className="flex h-full items-start justify-between gap-6">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-white">
            {value}
          </h2>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1.5">

          <span
            className={`h-2.5 w-2.5 rounded-full ${statusStyles[status].dot}`}
          />

          <span
            className={`text-sm font-medium ${statusStyles[status].text}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>

        </div>

      </div>

    </Card>
  );
}

export default StatusCard;