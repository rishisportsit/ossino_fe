import { cn } from 'helpers/ui';

type BetBlockButtonProps = {
  label: string;
  selected?: boolean;
  onClick: () => void;
  value: number;
};

const BetBlockButton = ({
  label,
  value,
  selected = false,
  onClick,
}: BetBlockButtonProps) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-base-300 text-xs text-center">{label}</span>
      <button
        type="button"
        className={cn(
          'h-[38px] flex items-center rounded-lg font-medium px-3 justify-center',
          selected ? 'bg-secondary-2 text-base-900' : 'bg-base-700 body-txtColor-1',
        )}
        onClick={onClick}
      >
        {Number(value).toFixed(2)}
      </button>
    </div>
  );
};
export default BetBlockButton;
