import Card from "../common/Card";

type Props = {
  title: string;
  value: string | number;
};

const ChartCard = ({ title, value }: Props) => {
  return (
    <Card className="space-y-3">
      <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
        {title}
      </h2>

      <p className="text-3xl font-semibold text-white sm:text-4xl">
        {value}
      </p>
    </Card>
  );
};

export default ChartCard;