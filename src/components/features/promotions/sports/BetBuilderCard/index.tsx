import { cn } from 'helpers/ui';

import styles from './index.module.css';

const BetBuilderCard = () => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl px-3 py-4 relative overflow-hidden w-[340px] h-[160px]',
        styles['bg-gradient'],
      )}
    >
      <div className="flex flex-col flex-1 justify-center relative z-10">
        <h2 className="text-primary-1 text-[34px] leading-none font-extrabold mb-[18px]">
          Betbuilder
        </h2>
        <p className="text-sm leading-[18px]">
          Boost your rewards from one <br /> match
        </p>
      </div>
      <div className="flex justify-end relative z-10">
        <button className="bg-base-200 body-txtColor-2 rounded-lg text-sm font-medium hover:bg-base-300 transition-colors px-3" style={{ height: '28px' }}>
          Bet Now
        </button>
      </div>
      <img
        src="/images/sports/promotions/BetBuilderCard/bc.png"
        alt="ball center"
        className="absolute bottom-[10%] right-[50%] translate-x-1/2"
        width={40}
        height={40}
      />
      <img
        src="/images/sports/promotions/BetBuilderCard/bl.png"
        alt="ball left"
        className="absolute bottom-0 left-[10%] "
        width={73}
        height={73}
      />
      <img
        src="/images/sports/promotions/BetBuilderCard/br.png"
        alt="ball right"
        className="absolute top-0 right-0"
      />
    </div>
  );
};

export default BetBuilderCard;
