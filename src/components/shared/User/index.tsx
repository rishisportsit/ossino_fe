import { useMemo } from 'react';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { useAppSelector } from 'store/index';
import {
  selectLoyaltyDetails,
  selectLoyaltyDetailsError,
  selectLoyaltyDetailsLoading,
} from 'store/loyaltyDetails/selectors';
import { selectIsVipUser } from 'store/user/selectors';
import { LEVEL_CONFIG } from 'components/pages/OverviewPage';

import UserCard from 'components/shared/User/UserCard';
import MenuList from 'components/shared/MenuItem/MenuList';
import UserCardSkeleton from '../UserCardSkeleton';
import ErrorMessage from '../ErrorMessage';
import { links } from 'components/shared/User/userMenuItems';

const UserMenu = () => {
  const { screenWidth } = useBreakpoint();
  const isLargeScreen = screenWidth >= BREAKPOINTS.xl;

  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);
  const loyaltyDetailsError = useAppSelector(selectLoyaltyDetailsError);
  const loyaltyDetailsLoading = useAppSelector(selectLoyaltyDetailsLoading);
  const isVipUser = useAppSelector(selectIsVipUser);

  const menuList = useMemo(() => links(isLargeScreen, isVipUser), [isLargeScreen, isVipUser]);

  const getLevelConfig = (levelKey: string) => {
    if (!levelKey) return LEVEL_CONFIG[0] || null;
    return (
      LEVEL_CONFIG.find((config) => config.level === levelKey) ||
      LEVEL_CONFIG[0] ||
      null
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

  const userCardData = useMemo(() => {
    if (!loyaltyDetails) return null;

    const { coins: pointsInCurrentLevel = 0, level: loyaltyLevel = '' } =
      loyaltyDetails;

    const currentLevelConfig = getLevelConfig(loyaltyLevel);
    const nextLevelConfig = getNextLevelConfig(loyaltyLevel);

    if (!currentLevelConfig) return null;

    const currentLevelEntry = currentLevelConfig.levelEntry || 0;
    const nextLevelEntry =
      nextLevelConfig?.levelEntry ||
      currentLevelConfig.levelCutoff ||
      pointsInCurrentLevel;

    let progress = 100;

    if (nextLevelConfig) {
      const progressRaw =
        ((pointsInCurrentLevel - currentLevelEntry) /
          (nextLevelEntry - currentLevelEntry)) *
        100;
      progress = Math.min(Math.max(progressRaw, 0), 100);
    }

    const result = {
      progress,
      currentStatus: {
        icon: { id: 'currentLevelIcon', href: currentLevelConfig.image },
        levelImage: currentLevelConfig.image,
        image: currentLevelConfig.image,
        src: currentLevelConfig.image,
        label: currentLevelConfig.levelName,
      },
      nextStatus: nextLevelConfig
        ? {
            icon: { id: 'nextLevelIcon', href: nextLevelConfig.image },
            levelImage: nextLevelConfig.image,
            image: nextLevelConfig.image,
            src: nextLevelConfig.image,
            label: nextLevelConfig.levelName,
          }
        : null,
    };

    return result;
  }, [loyaltyDetails]);

  if (loyaltyDetailsLoading) {
    return (
      <div className="flex flex-col gap-2 m-2 sm:m-4">
        <UserCardSkeleton />
        <MenuList isOpen list={menuList} />
      </div>
    );
  }

  if (loyaltyDetailsError) {
    return (
      <div className="flex flex-col gap-2 m-2 sm:m-4">
        <div className="flex-1 min-h-[145px] xl:min-h-[189px] flex flex-col justify-center bg-base-800 rounded-xl">
          <ErrorMessage message={loyaltyDetailsError.message} />
        </div>
        <MenuList isOpen list={menuList} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 m-2 sm:m-4">
      {userCardData && (
        <UserCard
          progress={userCardData.progress}
          currentsStatus={userCardData.currentStatus}
          nextStatus={userCardData.nextStatus}
        />
      )}
      <MenuList isOpen list={menuList} />
    </div>
  );
};

export default UserMenu;
