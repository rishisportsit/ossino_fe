import React, { useState } from 'react';

interface RangeInputProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange?: (value: number) => void;
}

const RangeInput = ({
  min,
  max,
  step,
  initialValue,
  onChange,
}: RangeInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (onChange) {
      onChange(newValue);
    }
    setValue(newValue);
  };

  return (
    <input
      id="range"
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      className="w-full h-[2px] bg-base-500 md:border-base-600 rounded-lg appearance-none cursor-pointer "
      style={{ accentColor: 'var(--range-accent)' }}
    />
  );
};

export default RangeInput;
