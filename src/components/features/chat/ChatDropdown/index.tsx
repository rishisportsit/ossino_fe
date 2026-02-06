import Icon from 'components/shared/Icon';
import { useState } from 'react';

import { cn } from 'helpers/ui';
import type { DropDownItem } from './mockOptions';
import { dropdownOptions } from './mockOptions';
import arrowDown from '/icons/arrowDown.svg?url';
import arrowUp from '/icons/arrowUp.svg?url';

const ChatDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropDownItem>(
    dropdownOptions[0],
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: number) => {
    const optionFromUser = dropdownOptions.find((op) => op.id === option);

    if (optionFromUser) {
      setSelectedOption(optionFromUser);
    }

    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-row gap-2 items-center justify-center bg-base-700 rounded-lg w-[140px] h-8 px-3 py-2 text-sm leading-[14px]">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex flex-row gap-2 w-full h-full"
      >
        <div className="flex body-txtColor-1 flex-row gap-2 items-center bg-base-700">
          <Icon
            id={selectedOption.iconId}
            href={selectedOption.icon}
            className="h-4 w-4 fill-iconprimary"
          />
          <span>{selectedOption?.title || 'Global'}</span>
        </div>

        <div
          className={cn(
            'absolute',
            'flex',
            'flex-col',
            'cursor-default',
            'gap-3',
            'h-auto',
            'w-[180px]',
            'bg-base-700',
            'rounded-lg',
            'top-9',
            'right-0',
            'px-4',
            'py-1',
            { hidden: !isOpen },
          )}
        >
          <ul>
            {dropdownOptions.map((option) => (
              <li
                className="flex flex-row py-3 border-b border-borderdefault last:border-none"
                key={option.id}
              >
                <div className="cursor-pointer" onClick={() => handleSelect(option.id)}>
                  <div className="flex flex-row items-start gap-2">
                    <Icon
                      href={option.icon}
                      id={option.iconId}
                      className="w-4 h-4 fill-iconprimary"
                    />
                    <span>{option.title}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </button>
      <Icon
        id={isOpen ? 'arrowUpIcon' : 'arrowDownIcon'}
        href={isOpen ? arrowUp : arrowDown}
        className="h-4 w-4 fill-current body-txtColor-1"
      />
    </div>
  );
};

export default ChatDropdown;
