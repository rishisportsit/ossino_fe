import BenefitsList from 'components/features/overview/BenefitsList';
import Faq from 'components/features/overview/Faq';
import LevelReachedDialog from 'components/features/overview/LevelReachedDialog';
import LevelsOverview from 'components/features/overview/LevelsOverview';
import LoyaltyPoints from 'components/features/overview/LoyaltyPoints';
import PlayAndErn from 'components/shared/PlayAndErn';
import UserCard from 'components/shared/UserCard';
import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import { useEffect, useRef } from 'react';
import { DIALOG_TYPE } from 'store/dialog/slice';
import VipSheet from 'components/features/overview/VipSheet';
import DialogVipPage from 'components/features/vip/DialogVipPage';
import Vip from 'components/features/overview/Vip';
import { useAppSelector, useAppDispatch } from 'store/index';
import { selectLoyaltyDetails } from 'store/loyaltyDetails/selectors';
import { LocalStorageHelper } from 'helpers/storage';
import {
  generateVipAffiliate,
  selectVipNeedsSetup,
  selectHasExistingVipData,
  selectVipDataLoading,
  setExistingAffiliate,
  checkVipData,
} from 'store/vip/slice';

export const LEVEL_CONFIG = [
  {
    level: 'level0',
    levelName: 'Amber Sprite',
    levelCutoff: 299,
    minBurnCoins: 50,
    maxBurnCoins: 100,
    realCashPercentage: 5,
    levelEntry: 10,
    image: '/images/levels/sprite.png',
  },
  {
    level: 'level1',
    levelName: 'Bronze Griffin',
    levelCutoff: 999,
    minBurnCoins: 101,
    maxBurnCoins: 200,
    realCashPercentage: 10,
    levelEntry: 300,
    image: '/images/levels/griffin.png',
  },
  {
    level: 'level2',
    levelName: 'Ruby Phoenix',
    levelCutoff: 2999,
    minBurnCoins: 200,
    maxBurnCoins: 400,
    realCashPercentage: 15,
    levelEntry: 1000,
    image: '/images/levels/phoenix.png',
  },
  {
    level: 'level3',
    levelName: 'Emerald Dragon',
    levelCutoff: 4999,
    minBurnCoins: 300,
    maxBurnCoins: 600,
    realCashPercentage: 20,
    levelEntry: 3000,
    image: '/images/levels/dragon.png',
  },
  {
    level: 'level4',
    levelName: 'Platinum Chimera',
    levelCutoff: 6999,
    minBurnCoins: 400,
    maxBurnCoins: 800,
    realCashPercentage: 25,
    levelEntry: 5000,
    image: '/images/levels/chimera.png',
  },
  {
    level: 'level5',
    levelName: 'Diamond Hydra',
    levelCutoff: 8999,
    minBurnCoins: 600,
    maxBurnCoins: 1200,
    realCashPercentage: 30,
    levelEntry: 7000,
    image: '/images/levels/hydra.png',
  },
  {
    level: 'level6',
    levelName: 'Titanic Leviathan',
    minBurnCoins: 800,
    maxBurnCoins: null,
    realCashPercentage: 35,
    levelEntry: 9000,
    image: '/images/levels/leviathan.png',
  },
];

const OVERVIEW_DIALOG_SHOWN_KEY = 'overview_page_dialog_shown';
const VIP_AFFILIATE_CACHE_KEY = 'vip_affiliate_cache';

export const clearDialogFlags = () => {
  LocalStorageHelper.removeItem(OVERVIEW_DIALOG_SHOWN_KEY);
};

export const clearAllVipCaches = () => {
  clearVipAffiliateCache();
  clearDialogFlags();
};

const getVipAffiliateCache = (userId: string): any => {
  const cache = LocalStorageHelper.getItem(VIP_AFFILIATE_CACHE_KEY);
  if (!cache) return null;

  try {
    const parsedCache: Record<string, any> = JSON.parse(cache as string);
    return parsedCache[userId] || null;
  } catch {
    return null;
  }
};

const setVipAffiliateCache = (userId: string, affiliateData: any): void => {
  const cache = LocalStorageHelper.getItem(VIP_AFFILIATE_CACHE_KEY);
  let parsedCache: Record<string, any> = {};

  if (cache) {
    try {
      parsedCache = JSON.parse(cache as string);
    } catch {
      parsedCache = {};
    }
  }

  parsedCache[userId] = {
    ...affiliateData,
    timestamp: Date.now(),
  };

  LocalStorageHelper.setItem(
    VIP_AFFILIATE_CACHE_KEY,
    JSON.stringify(parsedCache),
  );
};

export const clearVipAffiliateCache = (): void => {
  LocalStorageHelper.removeItem(VIP_AFFILIATE_CACHE_KEY);
};

const OverviewPage = () => {
  const dispatch = useAppDispatch();
  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);
  const user = useAppSelector((state) => state.user.data);

  const vipNeedsSetup = useAppSelector(selectVipNeedsSetup);
  const hasExistingVipData = useAppSelector(selectHasExistingVipData);
  const vipDataLoading = useAppSelector(selectVipDataLoading);

  const isAtVipLevel = loyaltyDetails?.level === 'level6';

  const showVipComponent =
    isAtVipLevel && (hasExistingVipData || vipNeedsSetup || vipDataLoading);

  const { openDialog } = useDialog();
  const { screenWidth } = useBreakpoint();
  const previousLevelRef = useRef<string | null>(null);
  const hasShownSessionDialog = useRef<boolean>(false);
  const hasTriggeredVipGeneration = useRef<boolean>(false);

  const getCurrentLevelConfig = (levelKey: string) => {
    return (
      LEVEL_CONFIG.find((config) => config.level === levelKey) ||
      LEVEL_CONFIG[0]
    );
  };

  const hasDialogBeenShownInSession = () => {
    return LocalStorageHelper.getItem(OVERVIEW_DIALOG_SHOWN_KEY) === 'true';
  };

  const markDialogAsShown = () => {
    LocalStorageHelper.setItem(OVERVIEW_DIALOG_SHOWN_KEY, 'true');
    hasShownSessionDialog.current = true;
  };

  useEffect(() => {
    if (
      loyaltyDetails?.level &&
      !hasShownSessionDialog.current &&
      !hasDialogBeenShownInSession()
    ) {
      const currentLevelConfig = getCurrentLevelConfig(loyaltyDetails.level);

      openDialog(DIALOG_TYPE.levelReached, {
        level: currentLevelConfig.levelName,
        image: currentLevelConfig.image,
      });

      markDialogAsShown();
    }
  }, [loyaltyDetails?.level, openDialog]);

  // Handle VIP setup for level 6 users
  useEffect(() => {
    if (
      loyaltyDetails?.level === 'level6' &&
      user &&
      !hasTriggeredVipGeneration.current
    ) {
      hasTriggeredVipGeneration.current = true;

      const cachedAffiliateData = getVipAffiliateCache(user.id.toString());
      if (cachedAffiliateData && cachedAffiliateData.btag) {
        dispatch(setExistingAffiliate({ btag: cachedAffiliateData.btag }));
        dispatch(
          checkVipData({
            userId: user.id.toString(),
            affiliateId: cachedAffiliateData.btag,
          }),
        );
        return;
      }

      if (user.vip === false) {
        dispatch(generateVipAffiliate())
          .unwrap()
          .then((result) => {
            if (result?.result?.data?.btag) {
              setVipAffiliateCache(user.id.toString(), result.result.data);
            }
          })
          .catch((error) => {
            console.log('Error generating VIP affiliate:', error);
          });
      } else if (user.vip === true && user.affliateBtag) {
        setVipAffiliateCache(user.id.toString(), {
          btag: user.affliateBtag,
          userName: user.email,
          source: 'user_profile',
        });

        dispatch(setExistingAffiliate({ btag: user.affliateBtag }));

        dispatch(
          checkVipData({
            userId: user.id.toString(),
            affiliateId: user.affliateBtag,
          }),
        );
      } else if (user.vip === true && !user.affliateBtag) {
        dispatch(generateVipAffiliate())
          .unwrap()
          .then((result) => {
            if (result?.result?.data?.btag) {
              setVipAffiliateCache(user.id.toString(), result.result.data);
            }
          })
          .catch((error) => {
            console.log('Error generating VIP affiliate for VIP user:', error);
          });
      }
    }
  }, [
    loyaltyDetails?.level,
    user?.vip,
    user?.affliateBtag,
    user?.id,
    user?.email,
    dispatch,
  ]);

  useEffect(() => {
    if (loyaltyDetails?.level) {
      const currentLevel = loyaltyDetails.level;
      const previousLevel = previousLevelRef.current;

      if (previousLevel && previousLevel !== currentLevel) {
        const currentLevelConfig = getCurrentLevelConfig(currentLevel);

        openDialog(DIALOG_TYPE.levelReached, {
          level: currentLevelConfig.levelName,
          image: currentLevelConfig.image,
        });
      }

      previousLevelRef.current = currentLevel;
    }
  }, [loyaltyDetails?.level, openDialog]);

  const layout = screenWidth >= BREAKPOINTS.xl ? 'horizontal' : 'default';

  return (
    <>
      <div className="px-4">
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 md:gap-y-3 md:gap-x-4 xl:gap-x-5 ">
          <div className="xl:row-span-2 [&>div]:h-full">
            <UserCard />
          </div>
          <div className="md:row-span-2 xl:row-span-1 xl:order-2">
            <LoyaltyPoints />
          </div>
          {showVipComponent ? <Vip /> : <PlayAndErn layout={layout} />}
        </div>
        <section className="mb-8">
          <div className="xl:p-5 xl:bg-base-800 xl:rounded-xl">
            <h3 className="mb-3 font-bold xl:text-lg">Benefits</h3>
            <BenefitsList />
          </div>
        </section>
        <section className="mb-8">
          <LevelsOverview />
        </section>
        <section>
          <Faq />
        </section>
      </div>
      <LevelReachedDialog />
      <DialogVipPage />
      <VipSheet />
    </>
  );
};

export default OverviewPage;
