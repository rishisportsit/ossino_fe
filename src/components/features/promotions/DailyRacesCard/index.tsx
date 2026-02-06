import { cn } from 'helpers/ui';
import type { BonusAmountData } from 'store/promotions/types';

import styles from './index.module.css';

const DailyRacesCard = ({ amount }: BonusAmountData) => {
  return (
    <div
      className={cn(
        'rounded-xl px-3 py-[34px] relative overflow-hidden',
        styles['bg-gradient'],
      )}
    >
      <div className="flex flex-col gap-1 justify-center">
        <h2 className="text-primary-1 text-[34px] leading-none font-extrabold">
          ${amount}
        </h2>
        <p className="text-xs font-black uppercase leading-[14px]">
          Daily races
        </p>
      </div>
      <div className='w-[131px] absolute right-[6.6%] inset-y-0'>
        <img
          src="/images/pr1.png"
          alt="prize"
          width={70}
          height={76}
          className="absolute top-[18%] left-[29%]"
        />
        <img
          src="/images/star-1.png"
          alt="star"
          width={20}
          height={19}
          className="absolute top-[6.6%] left-0"
        />
        <img
          src="/images/star-2.png"
          alt="star"
          width={9}
          height={9}
          className="absolute top-[5%] right-[16.3%]"
        />
        <img
          src="/images/star-3.png"
          alt="star"
          width={12}
          height={12}
          className="absolute right-0 bottom-[16.8%]"
        />
      </div>
    </div>
  );
};

export default DailyRacesCard;
