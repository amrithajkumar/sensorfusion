interface StatusBadgeProps {
  status: "success" | "warning" | "error";
  text: string;
}

const colors = {
  success: "bg-green-500/10 text-green-400 border-green-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
};

function StatusBadge({ status, text }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${colors[status]}`}
    >
      {text}
    </span>
  );
}

export default StatusBadge;