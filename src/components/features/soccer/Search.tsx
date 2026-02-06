import { useState } from 'react';

import { cn } from 'helpers/ui';
import setting from '/icons/setting.svg?url';
import Select from 'components/shared/Select';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import FilterDialog from './FilterDialog';

const options = [
  'Selected Option',
  'Most traded',
  'Newly added',
  'Low price',
  'Hight price',
  'Hight returns',
];

const Search = () => {
  const [category, setCategory] = useState<string>('Selected Option');
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  return (
    <>
      <div className="flex gap-2 mb-3">
        <div className="flex-1">
          <Select
            className="px-3 py-0 h-10 w-full xl:max-w-full bg-base-775 xl:bg-base-700"
            dropDownClassName="w-full bg-base-775 xl:bg-base-700"
            withChevron
            chevronClassName="bg-base-775 xl:bg-base-700"
            closeOnClick
            list={
              <div className="px-4 py-0">
                {options.map((label) => {
                  return (
                    <div
                      key={label}
                      className="border-b border-b-borderdefault py-3 text-xs last:border-none hover:text-primary-1"
                      onClick={() => setCategory(label)}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
            }
          >
            <div className="flex gap-2.5 items-center text-xs text-base-200">
              {category}
            </div>
          </Select>
        </div>
        <Button
          className={cn(
            'size-10 flex items-center rounded-lg bg-base-775 xl:bg-base-700 p-0 body-txtColor-1',
          )}
          onClick={() => setOpen(true)}
        >
          <Icon id="settingIcon" href={setting} className="w-5 h-5 fill-1" />
        </Button>
      </div>
      <FilterDialog open={open} onOpenChange={onOpenChange} />
    </>
  );
};

export default Search;
