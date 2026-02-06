import { SliderRoot, SliderThumb } from 'components/shared/ui/SliderInput';
import Tooltip from 'components/shared/ui/Tooltip';

type MultiColoredSliderInputProps = {
  value: number;
  onChange: (val: number) => void;
};

const MultiColoredSliderInput = ({
  value,
  onChange,
}: MultiColoredSliderInputProps) => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 w-full h-2 rounded-full -translate-y-1/2 flex gap-1">
        <div className="h-full rounded-full flex-1 bg-accent-2" />
        <div className="h-full rounded-full flex-1 bg-secondary-1" />
        <div className="h-full rounded-full flex-1 bg-base-300" />
      </div>
      <SliderRoot value={[value]} onValueChange={([value]) => onChange(value)}>
        <Tooltip
          side="top"
          className="p-2"
          content={
            <span className="font-bold text-xs flex flex-col items-center gap-0.5">
              $7.5
              <span className="text-secondary-1 text-10px font-normal">
                High Probability
              </span>
            </span>
          }
        >
          <SliderThumb className="z-20" />
        </Tooltip>
      </SliderRoot>
    </div>
  );
};

export default MultiColoredSliderInput;
