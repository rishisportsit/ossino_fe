import Leaderboard from 'components/features/leaderboard/Leaderboard';
import PageHeader from 'components/shared/PageHeader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'store/index';
import {
  selectLeaderboard as selectPromotionLeaderboard,
  selectLeaderboardLoading as selectPromotionLeaderboardLoading,
  selectLeaderboardError as selectPromotionLeaderboardError,
} from 'store/promotionLeaderboard/selectors';
import { getLeaderboard } from 'store/promotionLeaderboard/slice';
import { useMemo, useEffect } from 'react';
import { Button } from 'components/shared/ui/Button';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';

const PromotionLeaderboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const promotionId = searchParams.get('promotion');
  const userId = String(LocalStorageHelper.getItem(STORAGE_KEYS.userId) || '');

  // Get promotion leaderboard data
  const promotionLeaderboardData = useAppSelector(selectPromotionLeaderboard);
  const promotionLeaderboardLoading = useAppSelector(
    selectPromotionLeaderboardLoading,
  );
  const promotionLeaderboardError = useAppSelector(
    selectPromotionLeaderboardError,
  );

  // Fetch leaderboard data when component mounts or promotionId changes
  useEffect(() => {
    if (promotionId && userId) {
      const payload = {
        promotionId,
        playerId: userId,
        leaderboardSize: '10',
      };
      dispatch(getLeaderboard(payload));
    }
  }, [promotionId, userId, dispatch]);

  // Process promotion leaderboard data to match expected format
  const processedPromotionData = useMemo(() => {
    if (!promotionLeaderboardData) return null;

    const leaderboard = promotionLeaderboardData.leaderboard ?? [];
    const currentPlayer = promotionLeaderboardData.currentPlayer;

    const mapped = leaderboard.map((e: any) => ({
      id: Number(e.rankPosition) || 0,
      place: e.rankPosition,
      username: e.playerId,
      avatar: '/images/users/user.png',
      value: e.metricValue || 0,
      metricType: e.metricType,
    }));

    // Add currentPlayer to mapped data if it exists and isn't already in leaderboard
    if (
      currentPlayer &&
      currentPlayer.metricValue !== null &&
      !mapped.find((item) => item.username === currentPlayer.playerId)
    ) {
      const currentPlayerMapped = {
        id: Number(currentPlayer.rankPosition) || 0,
        place: currentPlayer.rankPosition,
        username: currentPlayer.playerId,
        avatar: '/images/users/user.png',
        value: currentPlayer.metricValue || 0,
        metricType: currentPlayer.metricType,
      };
      mapped.push(currentPlayerMapped);
      // Sort by position to maintain leaderboard order
      mapped.sort((a, b) => a.place - b.place);
    }

    return {
      top: mapped.slice(0, 3),
      others: mapped.slice(3),
    };
  }, [promotionLeaderboardData]);

  return (
    <>
      <PageHeader className="px-4 xl:px-5 mt-[76px] md:mt-0"></PageHeader>
      <div className="pb-16 px-4 xl:px-5">
        <div className="xl:flex xl:gap-5 xl:items-start">
          <Leaderboard
            loading={promotionLeaderboardLoading}
            error={promotionLeaderboardError}
            data={processedPromotionData}
            onClose={() => navigate(-1)}
          />
        </div>
      </div>
    </>
  );
};

export default PromotionLeaderboardPage;
