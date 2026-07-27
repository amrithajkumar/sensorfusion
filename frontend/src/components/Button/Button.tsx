type ButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
};

function Button({
  title,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        rounded-xl
        bg-cyan-600
        py-4
        text-lg
        font-semibold
        text-white
        transition-all
        duration-200

        hover:bg-cyan-700

        disabled:bg-gray-300
        disabled:cursor-not-allowed
      `}
    >
      {title}
    </button>
  );
}

export default Button;