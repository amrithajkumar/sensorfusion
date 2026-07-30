import PrimaryButton from "../common/PrimaryButton";

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
    <PrimaryButton
      onClick={onClick}
      disabled={disabled}
      className="w-full"
    >
      {title}
    </PrimaryButton>
  );
}

export default Button;