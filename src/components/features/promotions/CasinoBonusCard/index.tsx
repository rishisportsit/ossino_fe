import type { CasinoBonusData } from "store/promotions/types";

const CasinoBonusCard = ({
  background,
  minDeposit,
  rollover,
  percentage,
  bonusUpTo,
}: CasinoBonusData) => {
  return (
    <div style={{ background }} className="rounded-xl p-3">
      <div className="flex items-center justify-between mb-[17px]">
        <span className="text-primary-1 text-[34px] leading-none font-extrabold">
          {percentage}%
        </span>
        <p className="h-[30px] flex text-base-700 uppercase items-center justify-center px-3 rounded-lg background-1 text-xs leading-[14px] font-black">
          Casino Bonus
        </p>
      </div>
      <div className="pb-[5px] flex items-center gap-2 justify-between">
        <div className="justify-center bg-background-1/[0.05] grow h-10 rounded-[4px] border border-border-1/[0.10] flex flex-col items-center gap-[2px]">
          <span className="text-sm font-extrabold leading-none">
            ${bonusUpTo}
          </span>
          <span className="text-[10px] text-base-200 leading-[13px]">
            Bonus up to
          </span>
        </div>
        <div className="justify-center bg-background-1/[0.05] grow h-10 rounded-[4px] border border-border-1/[0.10] flex flex-col items-center gap-[2px]">
          <span className="text-sm font-extrabold leading-none">
            ${minDeposit}
          </span>
          <span className="text-[10px] text-base-200 leading-[13px]">
            Min Deposit
          </span>
        </div>
        <div className="justify-center bg-background-1/[0.05] grow h-10 rounded-[4px] border border-border-1/[0.10] flex flex-col items-center gap-[2px]">
          <span className="text-sm font-extrabold leading-none">
            {rollover}x
          </span>
          <span className="text-[10px] text-base-200 leading-[13px]">
            Rollover
          </span>
        </div>
      </div>
    </div>
  );
};

export default CasinoBonusCard;
