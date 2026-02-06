// components/BonusesContent/index.tsx
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getRegisterBonuses } from 'store/registerBonuses/slice';
import { getBonusHistory } from 'store/bonusHistory/slice';
import type { RegisterBonus } from 'api/registerBonuses/registerBonuses.types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { Accordion } from '../ui/Accordion';
import BonusesUsageItem from '../BonusesUsageItem';
import documentCopy from '/icons/documentCopy.svg?url';
import Icon from '../Icon';
import { BonusHistoryTransaction } from 'api/registerBonuses/bonusHistory.types';
import BonusHistoryItem from '../BonusesHistoryItem';

const options = [
  {
    label: 'History',
    value: 'history',
  },
  {
    label: 'Usage',
    value: 'usage',
  },
];

const Empty = () => {
  return (
    <div className="w-full rounded-xl bg-base-800 h-[515px] flex items-center justify-center md:h-[444px] xl:bg-transparent xl:h-[600px]">
      <div className="flex flex-col items-center">
        <Icon
          id="documentCopyIcon"
          href={documentCopy}
          className="w-16 h-16 mb-4 icon-placeholder"
        />
        <p className="text-sm text-base-400">No actions to show here</p>
      </div>
    </div>
  );
};

const LoadingState = ({ message }: { message: string }) => {
  return (
    <div className="w-full rounded-xl bg-base-800 h-[515px] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-2 border-base-400 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-base-400">{message}</p>
      </div>
    </div>
  );
};

const ErrorState = ({ message }: { message: string }) => {
  return (
    <div className="w-full rounded-xl bg-base-800 h-[515px] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <p className="text-sm text-red-400 mb-2">Error loading data</p>
        <p className="text-xs text-base-400">{message}</p>
      </div>
    </div>
  );
};

const BonusesHistory = ({
  transactions,
}: {
  transactions: BonusHistoryTransaction[];
}) => {
  return (
    <div className="flex flex-col gap-3">
      {transactions.map((transaction) => (
        <BonusHistoryItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

const BonusesUsage = ({ 
  bonuses, 
  onAccordionChange 
}: { 
  bonuses: RegisterBonus[];
  onAccordionChange?: (isOpen: boolean) => void;
}) => {
  return (
    <Accordion 
      type="single" 
      collapsible 
      className="flex flex-col gap-3"
      onValueChange={(value) => onAccordionChange?.(!!value)}
    >
      {bonuses.map((bonus) => (
        <BonusesUsageItem key={bonus.id} bonus={bonus} />
      ))}
    </Accordion>
  );
};

const BonusesContent = () => {
  const dispatch = useAppDispatch();

  const usageData = useAppSelector((state) => state.registerBonuses.data);
  const usageLoading = useAppSelector((state) => state.registerBonuses.loading);
  const usageError = useAppSelector((state) => state.registerBonuses.error);

  const historyData = useAppSelector((state) => state.bonusHistory.data);
  const historyLoading = useAppSelector((state) => state.bonusHistory.loading);
  const historyError = useAppSelector((state) => state.bonusHistory.error);

  const [currentTab, setCurrentTab] = useState<string>(options[0].value);
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentTab === 'history') {
      dispatch(getBonusHistory(0));
    } else if (currentTab === 'usage') {
      dispatch(getRegisterBonuses());
    }
  }, [dispatch, currentTab]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };

  return (
    <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
      <TabsList className="border-b-base-600 w-full justify-start">
        {options.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="font-medium flex-1 sm:flex-none sm:w-32 min-w-0 px-4 py-2 text-center"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="history" className="mt-4">
        {historyLoading ? (
          <LoadingState message="Loading bonus history..." />
        ) : historyError ? (
          <ErrorState message={historyError.message} />
        ) : historyData && historyData.length > 0 ? (
          <BonusesHistory transactions={historyData} />
        ) : (
          <Empty />
        )}
      </TabsContent>

      <TabsContent value="usage" className="mt-4">
        {usageLoading ? (
          <LoadingState message="Loading bonuses..." />
        ) : usageError ? (
          <ErrorState message={usageError.message} />
        ) : usageData && usageData.length > 0 ? (
          <BonusesUsage 
            bonuses={usageData} 
            onAccordionChange={setIsAccordionOpen}
          />
        ) : (
          <Empty />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default BonusesContent;
