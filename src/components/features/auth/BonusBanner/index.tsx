import ChevronRightIcon from 'assets/icons/ChevronRightIcon';
import { cn } from 'helpers/ui';

import classes from './BonusBanner.module.css';

const BonusBanner = () => {
  return (
    <div
      className={cn('pl-4 pr-3 py-3 rounded-xl', classes['banner-gradient'])}
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-background-1/20 flex items-center justify-center">
          <img src="/images/prize1.png" alt="prize" width={19} height={21} />
        </div>
        <div className="grow">
          <h3 className="font-bold leading-5 mb-0.5">Welcome Bonus</h3>
          <p className="text-xs leading-4">Select your welcome bonus</p>
        </div>
        <ChevronRightIcon />
      </div>
    </div>
  );
};

export default BonusBanner;
