import { cn } from 'helpers/ui';

type LineBetBlockButtonProps = {
  label: string;
  value: number;
  selected?: boolean;
  onClick: () => void;
};

const LineBetBlockButton = ({
  label,
  value,
  selected = false,
  onClick,
}: LineBetBlockButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'h-[38px] flex items-center rounded-lg font-medium px-3 justify-between',
        selected ? 'bg-secondary-2 text-base-900' : 'bg-base-700 body-txtColor-1',
      )}
      onClick={onClick}
    >
      <span
        className={cn('text-base-300 text-xs font-normal', {
          'text-base-900': selected,
        })}
      >
        {label}
      </span>
      {Number(value).toFixed(2)}
    </button>
  );
};

export default LineBetBlockButton;
