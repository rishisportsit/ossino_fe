import { type ReactNode, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'store/index';

import ErrorMessage from 'components/shared/ErrorMessage';
import Icon from 'components/shared/Icon';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import { Skeleton } from 'components/shared/ui/Skeleton';
import { formatNumber } from 'helpers/numbers';
import {
  selectCoinsOverview,
  selectCoinsOverviewError,
  selectCoinsOverviewLoading,
  selectCoinsOverviewHistoryAggregates
} from 'store/coinsOverview/selectors';
import { getCoinsOverviewFromHistory } from 'store/coinsOverview/slice';
import fire from '/icons/fire.svg?url';
import gamepad from '/icons/gamepad.svg?url';
import wallet2 from '/icons/wallet2.svg?url';
import { selectLoyaltyDetails } from 'store/loyaltyDetails/selectors';
import type { LoyaltyDetails } from 'store/loyaltyDetails/slice';

const OptionType = {
  earns: 'earns',
  burns: 'burns',
  cashback: 'cashback',
} as const;

type OptionKey = keyof typeof OptionType;

type Option = {
  icon: ReactNode;
  label: string;
  order: number;
};

type ApiCoinsOverview = {
  coins?: number;
  points?: number;
  lifeTimeCoins?: number;
};

type CoinsOverviewData = {
  earns?: number;
  burns?: number;
  cashback?: number;
};

const options: Record<OptionKey, Option> = {
  earns: {
    icon: (
      <Icon
        id="gamepadIcon"
        href={gamepad}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
    label: 'Lifetime Earns',
    order: 1,
  },
  burns: {
    icon: (
      <Icon
        id="fireIcon"
        href={fire}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
    label: 'Lifetime Burns',
    order: 2,
  },
  cashback: {
    icon: (
      <Icon
        id="wallet2Icon"
        href={wallet2}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
    label: 'Lifetime Cashback',
    order: 3,
  },
};

const OverviewItem = ({ option, value }: { option: Option; value: number }) => {
  const safeValue = typeof value === 'number' && !Number.isNaN(value) ? value : 0;

  const isCashback = option.label === 'Lifetime Cashback';
  return (
    <div
      style={{ order: option.order }}
      className="p-4 border border-base-700 rounded-lg flex gap-1 xl:border-none xl:rounded-xl xl:flex-col xl:items-center xl:justify-center xl:flex-1 xl:bg-base-735"
    >
      {option.icon}
      <span className="text-sm text-base-200 xl:body-txtColor-1 xl:text-xs">
        {option.label}
      </span>
      <span className="ml-auto font-medium text-primary-1 text-sm xl:ml-0">
        {isCashback ? `₮${formatNumber(safeValue)}` : formatNumber(safeValue)}
      </span>
    </div>
  );
};

const OverviewItemSkeleton = () => {
  return (
    <div className="p-4 border border-base-700 rounded-lg flex gap-1 xl:border-none xl:rounded-xl xl:flex-col xl:items-center xl:justify-center xl:flex-1 xl:bg-base-735">
      <Skeleton className="h-[20px] w-[20px]" />
      <Skeleton className="h-[18px] w-[82px] mt-0.5 xl:mt-0" />
      <Skeleton className="h-[21px] w-[70px] ml-auto xl:ml-0" />
    </div>
  );
};

const transformApiData = (
  apiData: ApiCoinsOverview,
  loyaltyDetails: LoyaltyDetails | null,
): CoinsOverviewData => {
  const coinsavailable = loyaltyDetails?.lifeTimeCoins;
  return {
    earns: coinsavailable || 0,
    burns: 0,
    cashback: apiData.points || 0,
  };
};

const CoinsOverview = () => {
  const dispatch = useAppDispatch();
  const coinsOverviewRaw = useAppSelector(selectCoinsOverview);
  const coinsOverviewLoading = useAppSelector(selectCoinsOverviewLoading);
  const coinsOverviewError = useAppSelector(selectCoinsOverviewError);
  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);
  const historyAggregates = useAppSelector(
    selectCoinsOverviewHistoryAggregates,
  );

  useEffect(() => {
    dispatch(getCoinsOverviewFromHistory());
  }, [dispatch]);

  const coinsOverview = coinsOverviewRaw
    ? transformApiData(coinsOverviewRaw as ApiCoinsOverview, loyaltyDetails)
    : null;

  if (coinsOverviewError) {
    const { message } = coinsOverviewError;

    return (
      <>
        <div className="hidden xl:flex flex-col justify-center absolute top-0 left-0 w-full h-full">
          <ErrorMessage message={message} />
        </div>
        <div className="rounded-xl bg-base-800 px-4 xl:hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Coins Overview</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 pb-4">
                <div className="h-[187px] flex flex-col justify-center">
                  <ErrorMessage message={message} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </>
    );
  }

  if (coinsOverviewLoading) {
    return (
      <>
        <div className="rounded-xl bg-base-800 px-4 xl:hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Coins Overview</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 pb-4">
                {Object.keys(options).map((name) => (
                  <OverviewItemSkeleton key={name} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="hidden xl:flex xl:gap-3 h-full">
          {Object.keys(options).map((name) => (
            <OverviewItemSkeleton key={name} />
          ))}
        </div>
      </>
    );
  }

  if (!coinsOverview) {
    return (
      <>
        <div className="h-[107px] hidden xl:flex flex-col justify-center">
          <NoItemsMessage message="No coins overview data" />
        </div>
        <div className="rounded-xl bg-base-800 px-4 xl:hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Coins Overview</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 pb-4">
                <div className="h-[187px] flex flex-col justify-center">
                  <NoItemsMessage message="No coins overview data" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </>
    );
  }

  const mergedOverview = coinsOverview
    ? {
      ...coinsOverview,
      burns: historyAggregates?.burns ?? coinsOverview.burns ?? 0,
      cashback: historyAggregates?.cashback ?? coinsOverview.cashback ?? 0,
    }
    : null;

  return (
    <>
      <div className="rounded-xl bg-base-800 px-4 xl:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Coins Overview</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 pb-4">
              {mergedOverview &&
                Object.entries(mergedOverview).map(([name, value]) => {
                  const key = name as OptionKey;
                  if (!options[key]) return null;
                  return (
                    <OverviewItem
                      key={key}
                      option={options[key]}
                      value={value || 0}
                    />
                  );
                })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="hidden xl:flex xl:gap-3 h-full">
        {mergedOverview &&
          Object.entries(mergedOverview).map(([name, value]) => {
            const key = name as OptionKey;
            if (!options[key]) return null;
            return (
              <OverviewItem
                key={key}
                option={options[key]}
                value={value || 0}
              />
            );
          })}
      </div>
    </>
  );
};

export default CoinsOverview;
