import Badge from 'components/shared/ui/Badge';
import CircleProgress from 'components/shared/ui/CircleProgress';
import { formatNumber } from 'helpers/numbers';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  selectLoyaltyDetails,
  selectLoyaltyDetailsError,
  selectLoyaltyDetailsLoading,
} from 'store/loyaltyDetails/selectors';
import { getLoyaltyDetails } from 'store/loyaltyDetails/slice';
import UserCardSkeleton from '../UserCardSkeleton';
import ErrorMessage from '../ErrorMessage';
import NoItemsMessage from '../NoItemsMessage';
import { LEVEL_CONFIG } from 'components/pages/OverviewPage';


const UserCard = () => {
  const dispatch = useAppDispatch();

  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);
  const loyaltyDetailsError = useAppSelector(selectLoyaltyDetailsError);
  const loyaltyDetailsLoading = useAppSelector(selectLoyaltyDetailsLoading);

  useEffect(() => {
    dispatch(getLoyaltyDetails());
  }, [dispatch]);

  if (loyaltyDetailsError) {
    const { message } = loyaltyDetailsError;

    return (
      <div className="flex-1 min-h-[145px] xl:min-h-[189px] flex flex-col justify-center bg-base-800 rounded-xl">
        <ErrorMessage message={message} />
      </div>
    );
  }

  if (loyaltyDetailsLoading) {
    return <UserCardSkeleton />;
  }

  if (!loyaltyDetails) {
    return (
      <div className="flex-1 min-h-[145px] xl:min-h-[189px] flex flex-col justify-center bg-base-800 rounded-xl">
        <NoItemsMessage message="No loyalty details found" />
      </div>
    );
  }

  const {
    coins: pointsInCurrentLevel = 0,
    lifeTimeCoins: lifeTimeRewardPoints = 0,
    level: loyaltyLevel = '',
  } = loyaltyDetails;

  const getCurrentLevelConfig = (levelKey: string) => {
    return (
      LEVEL_CONFIG.find((config) => config.level === levelKey) ||
      LEVEL_CONFIG[0]
    );
  };

  const getNextLevelConfig = (currentLevelKey: string) => {
    const currentIndex = LEVEL_CONFIG.findIndex(
      (config) => config.level === currentLevelKey,
    );
    if (currentIndex === -1 || currentIndex === LEVEL_CONFIG.length - 1) {
      return null;
    }
    return LEVEL_CONFIG[currentIndex + 1];
  };

  const currentLevelConfig = getCurrentLevelConfig(loyaltyLevel);
  const nextLevelConfig = getNextLevelConfig(loyaltyLevel);

  const loyaltyLevelName = currentLevelConfig.levelName;
  const levelImage = currentLevelConfig.image;

  const pointsToNextLevel = nextLevelConfig
    ? Math.max(0, nextLevelConfig.levelEntry - pointsInCurrentLevel)
    : 0;

  const currentLevelEntry = currentLevelConfig.levelEntry || 0;
  const nextLevelEntry =
    nextLevelConfig?.levelEntry ||
    currentLevelConfig.levelCutoff ||
    pointsInCurrentLevel;

  const progress = nextLevelConfig
    ? ((pointsInCurrentLevel - currentLevelEntry) /
      (nextLevelEntry - currentLevelEntry)) *
    100
    : 100;

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="px-4 backdrop-blur-[210px] bg-gradient-to-b from-5% from-gradient-secondary-dark-1 to-75% to-gradient-secondary-dark-2 py-5 flex items-center gap-3 rounded-xl flex-1 relative overflow-hidden md:gap-5 xl:gap-8">
      <div className="w-[104px] h-[104px] xl:w-[149px] xl:h-[149px] z-10">
        <CircleProgress
          bgClassName="stroke-1 opacity-5"
          mainClassName="stroke-primary-1"
          secondaryClassName="stroke-[#E0FF88]/[0.55] blur-[3px]"
          value={clampedProgress}
          minValue={0}
          maxValue={100}
        >
          <div className="w-[72px] h-[72px] xl:w-[103px] xl:h-[103px] bg-base-700 rounded-full flex items-center justify-center">
            <img
              src={levelImage}
              alt={loyaltyLevelName}
              width={40}
              height={40}
              className="md:w-[51px] xl:w-[73px] md:h-[51px] xl:h-[73px] object-contain"
            />
          </div>
        </CircleProgress>
      </div>
      <div className="flex-1">
        <p className="font-bold text-lg xl:text-2xl mb-1 banner-textColor-1">
          {loyaltyLevelName}
        </p>
        <Badge className="w-fit mb-1.5 xl:text-lg xl:mb-5">
          {formatNumber(pointsInCurrentLevel, 0, 'en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} coins
        </Badge>
        <div className="flex gap-2">
          <div className="flex flex-col flex-1">
            <span className="text-xs xl:text-base banner-textColor-1">Lifetime Coins</span>
            <span className="font-bold text-sm xl:text-xl banner-textColor-1">
              {formatNumber(lifeTimeRewardPoints, 0, 'en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-xs xl:text-base banner-textColor-1">
              {nextLevelConfig ? 'To Next Rank' : 'Max Level Reached'}
            </span>
            <span className="font-bold text-sm xl:text-xl">
              {nextLevelConfig ? formatNumber(pointsToNextLevel, 0, 'en', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '🏆'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
