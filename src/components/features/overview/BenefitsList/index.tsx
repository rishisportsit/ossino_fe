import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { Accordion } from 'components/shared/ui/Accordion';
import { useEffect, useMemo } from 'react';
import {
  selectBenefitsData,
  selectBenefitsError,
  selectBenefitsLoading,
} from 'store/benefits/selectors';
import { getBenefits } from 'store/benefits/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectLoyaltyDetails } from 'store/loyaltyDetails/selectors';
import { LEVEL_CONFIG } from '../../../pages/OverviewPage';
import BenefitAccordion from '../BenefitAccordion';
import BenefitAccordionSkeleton from '../BenefitAccordionSkeleton';

const BenefitsList = () => {
  const dispatch = useAppDispatch();

  const benefits = useAppSelector(selectBenefitsData);
  const benefitsError = useAppSelector(selectBenefitsError);
  const benefitsLoading = useAppSelector(selectBenefitsLoading);
  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);

  const dynamicBenefits = useMemo(() => {
    if (!loyaltyDetails) return [];

    const currentUserLevel = loyaltyDetails.level;
    const currentUserCoins = loyaltyDetails.coins || 0;

    const currentLevelIndex = LEVEL_CONFIG.findIndex(
      (config) => config.level === currentUserLevel,
    );

    return LEVEL_CONFIG.map((levelConfig, index) => {
      const isCurrentLevel = levelConfig.level === currentUserLevel;
      const isUnlocked = index <= currentLevelIndex;

      let progress = null;

      if (isCurrentLevel) {
        const currentLevelEntry = levelConfig.levelEntry || 0;
        const nextLevel = LEVEL_CONFIG[index + 1];

        if (nextLevel && nextLevel.levelEntry) {
          const nextLevelEntry = nextLevel.levelEntry;
          const coinsInCurrentLevel = Math.max(
            0,
            currentUserCoins - currentLevelEntry,
          );
          const totalCoinsNeededForNextLevel =
            nextLevelEntry - currentLevelEntry;
          const percentage = Math.min(
            100,
            Math.max(
              0,
              (coinsInCurrentLevel / totalCoinsNeededForNextLevel) * 100,
            ),
          );

          progress = {
            currentPoints: coinsInCurrentLevel,
            totalPoints: totalCoinsNeededForNextLevel,
            percentage: Math.round(percentage),
            title: `Progress to ${nextLevel.levelName}`,
          };
        } else if (levelConfig.levelCutoff) {
          const levelEnd = levelConfig.levelCutoff;
          const coinsInLevel = Math.max(
            0,
            currentUserCoins - currentLevelEntry,
          );
          const totalCoinsInLevel = Math.max(1, levelEnd - currentLevelEntry);
          const percentage = Math.min(
            100,
            Math.max(0, (coinsInLevel / totalCoinsInLevel) * 100),
          );

          progress = {
            currentPoints: coinsInLevel,
            totalPoints: totalCoinsInLevel,
            percentage: Math.round(percentage),
            title: `Progress in ${levelConfig.levelName}`,
          };
        } else {
          progress = {
            currentPoints: currentUserCoins,
            totalPoints: currentUserCoins,
            percentage: 100,
            title: `${levelConfig.levelName} - Max Level`,
          };
        }
      }

      const items = [
        {
          id: `burn-coins-${levelConfig.level}`,
          title: 'Burn Coins Range',
          description: `${levelConfig.minBurnCoins} - ${levelConfig.maxBurnCoins || 'Unlimited'} coins`,
          isOpened: isUnlocked,
        },
        {
          id: `cash-percentage-${levelConfig.level}`,
          title: 'Real Cash Percentage',
          description: `${levelConfig.realCashPercentage}% cash rewards`,
          isOpened: isUnlocked,
        },
        {
          id: `level-entry-${levelConfig.level}`,
          title: 'Level Entry Requirement',
          description: `${levelConfig.levelEntry} coins required`,
          isOpened: isUnlocked,
        },
      ];

      if (levelConfig.levelCutoff) {
        items.push({
          id: `level-cutoff-${levelConfig.level}`,
          title: 'Level Cap',
          description: `Maximum ${levelConfig.levelCutoff} coins`,
          isOpened: isUnlocked,
        });
      }

      return {
        id: index,
        title: levelConfig.levelName,
        points: levelConfig.levelEntry,
        isOpened: isUnlocked,
        progress,
        items,
        image: levelConfig.image,
        level: levelConfig.level,
      };
    });
  }, [loyaltyDetails]);

  useEffect(() => {
    dispatch(getBenefits());
  }, [dispatch]);

  if (benefitsError) {
    const { message } = benefitsError;

    return (
      <div className="flex flex-col justify-center h-[300px]">
        <ErrorMessage message={message} />
      </div>
    );
  }

  if (benefitsLoading && !loyaltyDetails) {
    return (
      <div className="w-full flex flex-col gap-3">
        {Array.from({ length: 7 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <BenefitAccordionSkeleton key={index} />
        ))}
      </div>
    );
  }

  const benefitsToShow =
    dynamicBenefits.length > 0 ? dynamicBenefits : benefits || [];

  if (benefitsToShow.length === 0) {
    return (
      <div className="flex flex-col justify-center h-[300px]">
        <NoItemsMessage message="No benefits found" />
      </div>
    );
  }

  return (
    <Accordion type="multiple" className="w-full flex flex-col gap-3">
      {benefitsToShow.map((benefit) => (
        <BenefitAccordion key={benefit.id} {...benefit} />
      ))}
    </Accordion>
  );
};

export default BenefitsList;
