import NumberField from 'components/shared/ui/NumberField';
import { cn } from 'helpers/ui';
import { useMemo } from 'react';

type StakeControlProps = {
  value: number;
  onChange: (next: number) => void;
  quickAddValues?: number[];
  showQuickAdd?: boolean;
  containerClassName?: string;
  inputWidth?: string;
  isLoggedIn?: boolean;
  usdToggleEnabled?: boolean;
  selectedCurrency?: string;
};

const StakeControlCard = ({
  value,
  onChange,
  quickAddValues = [25, 50, 75, 100],
  showQuickAdd = true,
  containerClassName = 'bg-base-700',
  inputWidth = 'w-16',
  isLoggedIn = false,
  usdToggleEnabled = false,
  selectedCurrency = ''
}: StakeControlProps) => {
  const add = (delta: number) => onChange(value + delta);
  const handleIncrease = () => onChange(value + 1);
  const handleDecrease = () => onChange(value > 0 ? value - 1 : 0);

  // Determine button visibility based on conditions
  const shouldShowButtons = useMemo(() => {
    if (!isLoggedIn) return true;
    if (isLoggedIn && usdToggleEnabled) return true;
    if (isLoggedIn && !usdToggleEnabled) return false;
    return false;
  }, [isLoggedIn, usdToggleEnabled]);

  return (
    <div className="flex items-center gap-2">
      {showQuickAdd && shouldShowButtons &&
        quickAddValues.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => add(v)}
            className="bg-transparent text-special-2 text-xs rounded hover:body-txtColor-1"
          >
            +{v}
          </button>
        ))}

      <NumberField
        containerClassName={cn('h-7', containerClassName)}
        inputClassName={inputWidth}
        value={value}
        onChange={(next: number) => {
          onChange(next);
        }}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        showButtons={shouldShowButtons}
        maxDecimalPlaces={usdToggleEnabled  || selectedCurrency === 'USDT'  ? 2 : 10}

      />
    </div>
  );
};

export default StakeControlCard;
