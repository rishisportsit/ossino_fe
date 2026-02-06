import type { ProcessedBetConfig } from 'api/betConfig/betConfig.types';

/**
 * Get BetConfig data from localStorage
 */
export const getBetConfigFromStorage = (): ProcessedBetConfig | null => {
  try {
    const stored = localStorage.getItem('betConfig');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to parse bet config from storage:', error);
    localStorage.removeItem('betConfig');
    return null;
  }
};

/**
 * Calculate bonus percentage for a given event count
 */
export const calculateBonusPercentage = (eventCount: number, configs: Array<{ eventCount: number; bonusPercentage: number }>): number => {
  const config = configs.find(c => c.eventCount === eventCount);
  return config?.bonusPercentage || 0;
};

/**
 * Calculate total odds from multiple selections
 */
export const calculateTotalOdds = (odds: number[]): number => {
  return odds.reduce((total, odd) => total * odd, 1);
};

/**
 * Calculate potential payout including bonus
 */
export const calculatePayout = (
  stake: number,
  totalOdds: number,
  bonusPercentage: number = 0
): { basePayout: number; bonusAmount: number; totalPayout: number } => {
  const basePayout = stake * totalOdds;
  const bonusAmount = basePayout * (bonusPercentage / 100);
  const totalPayout = basePayout + bonusAmount;
  
  return {
    basePayout,
    bonusAmount,
    totalPayout,
  };
};

/**
 * Validate stake amount against limits
 */
export const validateStake = (stake: number, minStake: number, maxStake: number): { isValid: boolean; error?: string } => {
  if (stake < minStake) {
    return { isValid: false, error: `Minimum stake is ${minStake}` };
  }
  if (stake > maxStake) {
    return { isValid: false, error: `Maximum stake is ${maxStake}` };
  }
  return { isValid: true };
};

/**
 * Check if BetConfig should be refetched for a new currency
 */
export const shouldRefetchBetConfig = (currentCurrency: string, lastFetchedCurrency: string | null): boolean => {
  return !lastFetchedCurrency || lastFetchedCurrency !== currentCurrency;
};


export function handleSelectionsGlobal(
  setAddingSelections: React.Dispatch<React.SetStateAction<any[]>>,
  selection: any,
  match: any,
  marketId?: string | number
) {
  setAddingSelections(prev => {
    const updatedSelection = (({ translations, ...rest }) => ({ ...rest }))(selection);
    const { translations, ...sanitizedMatch } = match;
    const matchIndex = prev.findIndex(m => m.providerFixtureId === match.providerFixtureId);

    const getMarketObj = match?.markets?.find((m: any) => String(m.marketId) === String(marketId));
        const marketObj = {
         cashoutAvailability: getMarketObj?.cashoutAvailability || null,
         marketId: getMarketObj?.marketId || marketId,
         marketName: getMarketObj?.marketName || '',
         marketStatusName: getMarketObj?.marketStatusName || '',
          marketTemplateId: getMarketObj?.marketTemplateId || null,
          selections: [updatedSelection],
        };

    if (matchIndex > -1) {
      const existingMatch = prev[matchIndex];
      const existingMarket = existingMatch.markets?.[0];
      const existingSelection = existingMarket?.selections?.[0];
      if (
        String(existingMarket?.marketId) === String(marketObj.marketId) &&
        existingSelection?.selectionId === updatedSelection.selectionId
      ) {
        return prev.filter((_, i) => i !== matchIndex);
      }
      const newMarkets = [marketObj];
      const updatedMatch = { ...existingMatch, ...sanitizedMatch, markets: newMarkets };
      const newState = [...prev];
      newState[matchIndex] = updatedMatch;
      return newState;
    } else {
      const newMatch = {
        ...sanitizedMatch,
        markets: [marketObj],
      };
      return [...prev, newMatch];
    }
  });
}