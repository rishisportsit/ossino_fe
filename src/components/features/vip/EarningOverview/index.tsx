import { type ReactNode, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'store/index';
import { type VipDetailsOverview, getAffiliateSummary } from 'store/vip/slice';

import Icon from 'components/shared/Icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import { formatNumber } from 'helpers/numbers';
import profile2User from '/icons/profile2user.svg?url';

const OptionType = {
  numOfSignups: 'numOfSignups',
  totalEarningCoins: 'totalEarningCoins',
  availableEarnings: 'availableEarnings',
};

type Option = {
  icon: ReactNode;
  label: string;
  order: number;
};

const options: {
  [key in keyof typeof OptionType]: Option;
} = {
  numOfSignups: {
    icon: (
      <Icon
        id="profile2userIcon"
        href={profile2User}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
    label: 'No. of Signups',
    order: 2,
  },
  totalEarningCoins: {
    icon: (
      <img
        src="/images/redemptions/chip.png"
        className="w-5 h-5 object-cover"
        alt=""
      />
    ),
    label: 'Lifetime Cashback Earned',
    order: 1,
  },
  availableEarnings: {
    icon: (
      <img
        src="/images/redemptions/chip.png"
        className="w-5 h-5 object-cover"
        alt=""
      />
    ),
    label: 'Available Cashback',
    order: 3,
  },
};

type OverviewItemProps = {
  option: Option;
  value: number;
};

const OverviewItem = ({ option, value }: OverviewItemProps) => {
  return (
    <div
      style={{ order: option.order }}
      className="px-4 border border-base-700 rounded-lg flex gap-1 h-11 items-center"
    >
      {option.icon}
      <span className="text-sm text-base-200">{option.label}</span>
      <span className="ml-auto font-medium text-primary-1 text-sm">
        {formatNumber(value)}
      </span>
    </div>
  );
};

const EarningOverview = () => {
  const dispatch = useAppDispatch();
  const affiliateSummary = useAppSelector(
    (state) => state.vip.affiliateSummary?.data ?? null,
  );
  const affiliateData = useAppSelector((state) => state.vip.affiliate?.data ?? null);
  const summaryLoading = useAppSelector(
    (state) => state.vip.affiliateSummary?.loading ?? false,
  );

  useEffect(() => {
    if (affiliateData?.btag) {
      dispatch(getAffiliateSummary({ bTag: affiliateData.btag }));
    }
  }, [dispatch, affiliateData?.btag]);

  const firstSummary = Array.isArray(affiliateSummary?.data) ? affiliateSummary.data[0] : undefined;
  const overviewData = firstSummary
    ? {
      totalEarningCoins: firstSummary.totalEarnings || 0,
      numOfSignups: firstSummary.totalRegistrations || 0,
      availableEarnings: firstSummary.availableEarnings || 0,
    }
    : null;

  return (
    <div className="rounded-xl bg-base-800 px-4">
      <Accordion
        type="single"
        collapsible
      >
        <AccordionItem value="item-1" className="flex flex-col">
          <AccordionTrigger>Earning Overview</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 md:gap-3 pb-4 md:pb-[38px] xl:pb-4">
            {summaryLoading && (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-2 border-primary-1 border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-base-400 text-sm">Loading overview...</p>
              </div>
            )}
            {!summaryLoading && overviewData && (
              Object.keys(overviewData)
                .filter((name) => options[name as keyof typeof OptionType])
                .map((name) => {
                  const option = options[name as keyof typeof OptionType];
                  return (
                    <OverviewItem
                      key={name}
                      option={option}
                      value={
                        overviewData[name as keyof VipDetailsOverview] || 0
                      }
                    />
                  );
                })
            )}
            {!summaryLoading && !overviewData && (
              <div className="text-center py-8">
                <div className="bg-base-700 rounded-xl p-6">
                  <h3 className="text-base-300 font-medium mb-2">
                    No Overview Data
                  </h3>
                  <p className="text-base-500 text-sm">
                    {!affiliateData?.btag
                      ? 'No affiliate data available.'
                      : 'Unable to load earning overview.'}
                  </p>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EarningOverview;
