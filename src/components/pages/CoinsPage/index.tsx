import BurnCoins from 'components/features/coins/BurnCoins';
import BalanceCoins from 'components/features/coins/BalanceCoins';
import PlayAndErn from 'components/shared/PlayAndErn';
import CoinsOverview from 'components/features/coins/CoinsOverview';
import CoinsHistory from 'components/features/coins/CoinsHistory';
import CoinsHistorySheet from 'components/features/coins/CoinsHistorySheet';
import RedemptionsSlider from 'components/shared/RedemptionsSlider';

const CoinsPage = () => {
  return (
    <>
      <div className="flex flex-col px-4 xl:px-5 md:flex-row gap-8 md:gap-4 mb-8">
        <div className="flex flex-col gap-2.5 flex-1 xl:bg-base-800 xl:p-5 xl:rounded-xl relative">
          <div className="h-[82px] md:flex-1 xl:flex-none xl:h-28">
            <BalanceCoins />
          </div>
          <div className="hidden md:block xl:flex-1">
            <div className="xl:hidden">
              <PlayAndErn layout="default" />
            </div>
            <div className="hidden xl:block xl:h-full">
              <CoinsOverview />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <BurnCoins />
        </div>
      </div>
      <div className="xl:px-5">
        <div className="xl:rounded-xl xl:py-5 xl:bg-base-800">
          <div className="pl-4 mb-8 xl:pl-5 xl:pr-0">
            <RedemptionsSlider />
          </div>
          <div className="px-4 mb-8 md:mb-5 xl:hidden">
            <CoinsOverview />
          </div>
          <div className="px-4 mb-8 md:mb-0 xl:px-5">
            <CoinsHistory />
          </div>
          <div className="px-4 md:hidden">
            <PlayAndErn layout="default" />
          </div>
        </div>
      </div>
      <CoinsHistorySheet />
    </>
  );
};

export default CoinsPage;
