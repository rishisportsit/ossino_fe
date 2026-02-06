import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from 'components/shared/ui/SliderInput';
import Tooltip from 'components/shared/ui/Tooltip';

type SliderInputProps = {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
};

const SliderInput = ({
  value,
  onChange,
  min = 0,
  max = 100,
}: SliderInputProps) => {
  return (
    <div>
      <SliderRoot
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        min={min}
        max={max}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <Tooltip side="top" className="p-2" content={<span>{value}</span>}>
          <SliderThumb />
        </Tooltip>
      </SliderRoot>
      <div className="flex justify-between">
        <span className="text-xs text-base-200">{min}</span>
        <span className="text-xs text-base-200">{max}</span>
      </div>
    </div>
  );
};

export default SliderInput;
