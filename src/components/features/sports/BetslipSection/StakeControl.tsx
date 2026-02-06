import NumberField from 'components/shared/ui/NumberField';
import { cn } from 'helpers/ui';

type StakeControlProps = {
  value: number;
  // onChange: (next: number) => void;
  quickAddValues?: number[];
  showQuickAdd?: boolean;
  containerClassName?: string;
  inputWidth?: string;
};

const StakeControl = ({
  value,
  
  quickAddValues = [25, 50, 75, 100],
  showQuickAdd = true,
  containerClassName = 'bg-base-700',
  inputWidth = 'w-16',
}: StakeControlProps) => {
  // const add = (delta: number) => onChange(value + delta);
  // const sub25 = () => onChange(value - 25);
  // const add25 = () => onChange(value + 25);

  return (
    <div className="flex items-center gap-2">
      {showQuickAdd &&
        quickAddValues.map((v) => (
          <button
            key={v}
            type="button"
            // onClick={() => add(v)}
            className="bg-transparent text-special-2 text-xs rounded hover:body-txtColor-1"
          >
            +{v}
          </button>
        ))}

      <NumberField
        // onDecrease={sub25}
        // onIncrease={add25}
        containerClassName={cn('h-7', containerClassName)}
        inputClassName={inputWidth}
        value={value}
      />
    </div>
  );
};

export default StakeControl;
