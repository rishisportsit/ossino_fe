import { useMemo } from 'react';
import Select from 'components/shared/Select';
import UserNameContainer from 'components/shared/User/UserNameContainer';
import UserMenu from 'components/shared/User/index';
import UserProfileAvatar from './UserProfileAvatar';
import { useAppSelector } from 'store/index';
import {
  selectLoyaltyDetails,
  selectLoyaltyDetailsLoading,
} from 'store/loyaltyDetails/selectors';
import { LEVEL_CONFIG } from 'components/pages/OverviewPage';

const UserAction = ({ name }: { name: string }) => {
  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);
  const loyaltyDetailsLoading = useAppSelector(selectLoyaltyDetailsLoading);

  const getCurrentLevelConfig = (levelKey: string) => {
    if (!levelKey) return LEVEL_CONFIG[0] || null;
    return (
      LEVEL_CONFIG.find((config) => config.level === levelKey) ||
      LEVEL_CONFIG[0] ||
      null
    );
  };

  const avatarData = useMemo(() => {
    if (loyaltyDetailsLoading) {
      return {
        levelImage: null,
        levelName: null,
        isLoading: true,
      };
    }

    if (!loyaltyDetails?.level) {
      return {
        levelImage: null,
        levelName: null,
        isLoading: false,
      };
    }

    const currentLevelConfig = getCurrentLevelConfig(loyaltyDetails.level);

    if (!currentLevelConfig) {
      return {
        levelImage: null,
        levelName: null,
        isLoading: false,
      };
    }

    return {
      levelImage: currentLevelConfig.image,
      levelName: currentLevelConfig.levelName,
      isLoading: false,
    };
  }, [loyaltyDetails, loyaltyDetailsLoading]);

  return (
    <Select
      dropDownClassName="min-w-[265px] sm:min-w-[320px] max-w-[400px] bg-base-800 z-[200]"
      list={<UserMenu />}
      withChevron
      closeOnClick
      maxHeightDisable={true}
    >
      <UserProfileAvatar
        withIndicator
        levelImage={avatarData.levelImage}
        levelName={avatarData.levelName}
        isLoading={avatarData.isLoading}
        size="md"
      />
      <UserNameContainer name={name} />
    </Select>
  );
};

export default UserAction;
