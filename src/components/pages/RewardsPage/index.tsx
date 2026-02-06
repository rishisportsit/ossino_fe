import Badges from 'components/features/rewards/Badges';
import DailyRewards from 'components/features/rewards/DailyRewards';
import Leaderboard from 'components/features/rewards/Leaderboard';
import Missions from 'components/features/rewards/Missions';
import PageContent from 'components/features/rewards/PageContent';
import Refer from 'components/shared/Refer';
import PlayAndErn from 'components/shared/PlayAndErn';
import UserCard from 'components/shared/UserCard';
import RedemptionsSlider from 'components/shared/RedemptionsSlider';
import { useNavigate } from 'react-router-dom';

const RewardsPage = () => {
  const navigate = useNavigate();
  const handleReferralClick = () => navigate('/referral');
  return (
    <>
      <div className="flex items-stretch gap-4 mb-4 px-4 xl:px-5 xl:mb-5 xl:gap-5">
        <UserCard />
        <div className="hidden md:block">
          <DailyRewards />
        </div>
      </div>
      <PageContent />
      <div className="hidden xl:flex px-5 gap-5 overflow-hidden">
        <div className="rounded-xl p-5 pb-8 pr-0 bg-base-800 flex-1 flex flex-col gap-9 w-[360px]">
          <Missions />
          <Badges />
          <RedemptionsSlider />
        </div>
        <div className="rounded-xl bg-base-800 p-5 w-[350px] h-fit flex flex-col gap-5">
          <Refer onInvite={handleReferralClick} />
          <Leaderboard />
          <PlayAndErn layout="default" />
        </div>
      </div>
      <div className="block mb-8 md:hidden pl-4">
        <DailyRewards />
      </div>
      <div className="flex gap-4 mb-8 px-4 xl:hidden">
        <div className="flex-1" >
          <Refer onInvite={handleReferralClick} />
        </div>
        <div className="hidden md:block flex-1">
          <PlayAndErn layout="default" />
        </div>
      </div>
      <div className="pl-4 mb-8 flex flex-col gap-8 xl:hidden">
        <Missions />
        <Badges />
        <RedemptionsSlider />
      </div>
      <div className="mb-8 xl:mb-0 px-4 xl:hidden">
        <Leaderboard />
      </div>
      <div className="md:hidden px-4">
        <PlayAndErn layout="default" />
      </div>
    </>
  );
};

export default RewardsPage;
