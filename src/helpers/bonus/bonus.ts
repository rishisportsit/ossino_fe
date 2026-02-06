export interface BonusConfigItem {
  eventCount: number;
  bonusPercentage: number;
}

export function getBonusInfo(
  bonusConfig: BonusConfigItem[],
  betSlipDataLocal: any[],
  threshold: number
) {
  const odds = betSlipDataLocal.map(
    bet => Number(bet?.markets[0]?.selections[0]?.decimalOdds)
  );
  const qualifyingCount = odds.filter(odd => odd > threshold).length;
const maxBonusPercentage = bonusConfig.reduce((max, cfg) => Math.max(max, cfg.bonusPercentage), 0);
  const currentBonus = bonusConfig.find(cfg => cfg.eventCount === qualifyingCount) || null;
  let nextBonus = null;
  if (currentBonus) {
    nextBonus = bonusConfig.find(cfg => cfg.bonusPercentage > currentBonus.bonusPercentage) || null;
  }
  if (odds.length > 0 && !nextBonus) {
    nextBonus = bonusConfig[0];
  }
  let bonusPercentage = 0;
  let nextBonusPercentage = 0;
  let nextEventCount = 0;
  let nextItemCount = 0;
  let progress = 0;
   if(nextBonus)
   {
    nextBonusPercentage = nextBonus.bonusPercentage;
    nextEventCount = nextBonus.eventCount;
   }
  if (currentBonus && currentBonus.eventCount === qualifyingCount) {
    bonusPercentage = currentBonus.bonusPercentage;
    if (nextBonus && nextBonus.bonusPercentage > currentBonus.bonusPercentage) {
      nextBonusPercentage = nextBonus.bonusPercentage;
      nextEventCount = nextBonus.eventCount;
      
    } else {
      nextBonusPercentage = 0;
      nextEventCount = 0;
      nextItemCount = 0;
    }
  }
  nextItemCount = nextEventCount - qualifyingCount;
  if(nextItemCount < 0) nextItemCount = 0; 
  if(maxBonusPercentage === currentBonus?.bonusPercentage)
    {
      progress = 100;
      nextBonusPercentage = currentBonus?.bonusPercentage;
    } 
    if (progress !== 100 && maxBonusPercentage > 0 && bonusPercentage >0)
    {
     progress = (maxBonusPercentage-(maxBonusPercentage-bonusPercentage))*100/(maxBonusPercentage);
    }
  
  return {
    bonusPercentage,
    nextBonusPercentage,
    nextItemCount,
    progress,
    maxBonusPercentage
  };
}