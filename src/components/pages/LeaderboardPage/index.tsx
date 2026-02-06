import Leaderboard from 'components/features/leaderboard/Leaderboard';
import LeaderboardButton from 'components/features/leaderboard/LeaderboardButton';
import PageHeader from 'components/shared/PageHeader';
import PlayAndErn from 'components/shared/PlayAndErn';
import Refer from 'components/shared/Refer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  selectFilteredLeaderboard,
  selectLeaderboardLoading,
  selectLeaderboardError,
} from 'store/leaderboard/selectors';
import { getLeaderboard } from 'store/leaderboard/slice';

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const handleReferralClick = () => navigate('/referral');
  const leaderboardData = useAppSelector(selectFilteredLeaderboard);
  const leaderboardLoading = useAppSelector(selectLeaderboardLoading);
  const leaderboardError = useAppSelector(selectLeaderboardError);

    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getLeaderboard());
    }, [dispatch]);

  return (
    <>
      <PageHeader className="px-4 xl:px-5 mt-[76px] md:mt-0">
        <LeaderboardButton />
      </PageHeader>
      <div className="pb-16 px-4 xl:px-5">
        <div className="xl:flex xl:gap-5 xl:items-start">
          <Leaderboard
            loading={leaderboardLoading}
            error={leaderboardError}
            data={leaderboardData}
          />
          <div className="hidden xl:flex xl:flex-col xl:gap-5 xl:p-5 xl:bg-base-800 xl:rounded-xl xl:w-[350px]">
            <div
              
              style={{ cursor: 'pointer' }}
            >
              <Refer onInvite={handleReferralClick} />
            </div>
            <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <PlayAndErn layout="default" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage;
