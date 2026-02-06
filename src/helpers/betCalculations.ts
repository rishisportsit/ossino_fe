export interface BetCalculationInput {
  stake: number;
  odds: number[];
  bonusPercentage?: number;
  oddsThreshold?: number;
  whtTaxPercentage?: number;
  stakeLimits?: {
    minStake: number;
    maxStake: number;
    maxPayout: number;
  };
}

export interface BetCalculationResult {
  totalOdds: number;
  bonusAmount: number;
  whtTaxAmount: number;
  totalPayout: number;
  isValidBet: boolean;
}

export const calculateBetValues = (input: BetCalculationInput): BetCalculationResult => {
  const { stake, odds, bonusPercentage = 0, oddsThreshold = 0, whtTaxPercentage = 0, stakeLimits } = input;
  
  const totalOdds = odds.reduce((acc, val) => acc * val, 1);
  let bonusAmount = 0;
  let trancatedOdds = Math.floor(totalOdds * 100) / 100;
  if (bonusPercentage > 0) {
    const bonusOdds = odds.filter(odd => odd > oddsThreshold);
    const bonusOddsProduct = bonusOdds.reduce((acc, val) => acc * val, 1);
    const truncatedBonusOdds = Math.floor(bonusOddsProduct * 100) / 100;
    bonusAmount = (truncatedBonusOdds * stake - stake) * bonusPercentage / 100;
  }

  let whtTaxAmount = 0;
  if (whtTaxPercentage > 0) {
    whtTaxAmount = ((trancatedOdds * stake) - stake + bonusAmount) * whtTaxPercentage / 100;
  }
  const totalPayout = trancatedOdds * stake + bonusAmount - whtTaxAmount;
  const isValidBet = stake > 0 && 
    (!stakeLimits || (
      stake >= stakeLimits.minStake && 
      stake <= stakeLimits.maxStake &&
      totalPayout <= stakeLimits.maxPayout
    ));
  
  return {
    totalOdds,
    bonusAmount,
    whtTaxAmount,
    totalPayout,
    isValidBet
  };
};