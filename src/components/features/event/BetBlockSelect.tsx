import Select from 'components/shared/Select';
import { useState } from 'react';

type BetBlockSelectProps = {
  label: string;
  values: number[];
};

const BetBlockSelect = ({ label, values }: BetBlockSelectProps) => {
  const [val, setVal] = useState<number>(values[0]);
  return (
    <div className="flex flex-col gap-1 w-full">
      <span className="text-base-300 text-xs text-center">{label}</span>
      <Select
        withChevron
        dropDownClassName="w-full z-[999]"
        chevronClassName="body-txtColor-1"
        childrenClassName="justify-center gap-2"
        className="border border-borderdefault body-txtColor-1 py-0 h-[38px] bg-base-775 !max-w-full"
        list={
          <div className="p-2 space-y-1 w-full">
            {values.map((value) => {
              return (
                <div
                  key={value}
                  className="px-2 py-1 hover:bg-base-690 rounded cursor-pointer"
                  onClick={() => setVal(value)}
                >
                  {Number(value).toFixed(2)}
                </div>
              );
            })}
          </div>
        }
      >
        {Number(val).toFixed(2)}
      </Select>
    </div>
  );
};
export default BetBlockSelect;
