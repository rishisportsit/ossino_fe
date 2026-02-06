import { useState } from 'react';
import { useAppDispatch } from 'store/index';
import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import ReferralEarnings from 'components/features/referral/ReferralEarnings';
import ReferralFaq from 'components/features/referral/ReferralFaq';
import ReferralOverview from 'components/features/referral/ReferralOverview';
import ReferralProgram from 'components/features/referral/ReferralProgram';
import ReferralReferrals from 'components/features/referral/ReferralReferrals';
import Icon from 'components/shared/Icon';
import PageHeader from 'components/shared/PageHeader';
import { Button } from 'components/shared/ui/Button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/shared/ui/Tabs';
import arrowRight from '/icons/arrowRight.svg?url';

const options = [
  {
    label: 'Overview',
    value: 'overview',
  },
  {
    label: 'Referrals',
    value: 'referrals',
  },
  {
    label: 'Earnings',
    value: 'earnings',
  },
];

const ReferralPage = () => {
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState<string>(options[0].value);

  return (
    <div className="px-4 xl:px-5 pb-16 mt-[76px] md:mt-0">
      <PageHeader to="/" className="mb-5 " />
      <div className="hidden xl:flex xl:flex-row xl:mb-10 xl:gap-5">
        <div className="w-2/3 h-fit">
          <ReferralProgram />
        </div>
        <img
          src="/images/referral-programm.png"
          alt=""
          className="w-1/3 h-[248px] object-cover rounded-xl"
        />
      </div>
      <Tabs defaultValue={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="border-b-base-600">
          {options.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className="font-medium w-32">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="xl:flex xl:gap-5">
          <TabsContent value="overview" className="xl:w-2/3">
            <ReferralOverview />
          </TabsContent>
          <TabsContent value="referrals" className="xl:w-2/3">
            <ReferralReferrals />
          </TabsContent>
          <TabsContent value="earnings" className="xl:w-2/3">
            <ReferralEarnings />
          </TabsContent>
          <div className="hidden xl:w-1/3 xl:gap-5 xl:flex xl:flex-col xl:mt-5">
            <Button
              size="xl"
              className="bg-base-800 rounded-xl body-txtColor-1 text-lg font-bold w-full justify-between hidden xl:flex"
              onClick={() => dispatch(openDialog({ id: DIALOG_TYPE.bonuses }))}
            >
              Earning History
              <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4 fill-current body-txtColor-1" />
            </Button>
            <ReferralFaq />
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ReferralPage;
