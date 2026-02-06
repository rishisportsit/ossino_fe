import { cn } from 'helpers/ui';
import type { BonusAmountData } from 'store/promotions/types';

import styles from './index.module.css';

const WelcomeBonusCard = ({ amount }: BonusAmountData) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-xl justify-start gap-[2px] pt-[26px] pb-[33px] relative overflow-hidden w-[340px] h-[160px]',
        styles['bg-gradient']
      )}
    >
      <div className="flex flex-col items-center mt-1">
        <h2 className="text-primary-1 text-[34px] leading-none font-extrabold">
          ${amount}
        </h2>
        <p className="text-sm leading-[18.2px]">Your welcome sport bonus</p>
      </div>
      <button className="bg-base-200 body-txtColor-2 rounded-lg text-sm font-medium hover:bg-base-300 transition-colors absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3" style={{ height: '28px' }}>
        Claim Now
      </button>
      <img
        src="/images/sports/promotions/WelcomeBonusCard/gl.png"
        alt="gift left"
        className="absolute top-[5%] left-[5%]"
      />
      <img
        src="/images/sports/promotions/WelcomeBonusCard/gr.png"
        alt="gift right"
        className="absolute -bottom-1 right-0 "
      />
    </div>
  );
};

export default WelcomeBonusCard;
