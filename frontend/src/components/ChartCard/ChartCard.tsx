type Props = {
  title: string;
  value: string | number;
};

const ChartCard = ({ title, value }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-gray-500 text-lg">{title}</h2>

      <p className="text-4xl font-bold mt-4">
        {value}
      </p>
    </div>
  );
};

export default ChartCard;