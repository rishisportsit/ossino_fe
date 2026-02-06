import type { GetLoyaltyLevelsResponseData } from 'api/loyalty/loyalty.types';
import type { AxiosResponse } from 'axios';
import type { Benefit } from './slice';

export const handleResponse = (
  response: AxiosResponse<GetLoyaltyLevelsResponseData>,
): Benefit[] => {
  const { loyaltyLevelsList } = response.data;

  const benefits: Benefit[] = loyaltyLevelsList.map((level) => ({
    id: level.levelId,
    title: level.levelName,
    image: level.levelImageUrl,
    points: level.levelEligibilityPoints,
    isOpened: false, // add real data
    items: [], // add real data
    // progress: {} // add real data
  }));

  return benefits;
};
