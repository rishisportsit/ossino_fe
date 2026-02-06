import type { RegisterBonusesResponseData, RegisterBonus } from 'api/registerBonuses/registerBonuses.types';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { handleResponse } from 'store/helpers/handleResponse';

const transformBonusData = (bonus: RegisterBonus): RegisterBonus => {
  try {
    return {
      ...bonus,
      name: bonus.bonusCode || `Bonus ${bonus.id}`,
      type: bonus.bonusType,
      applicableTo: bonus.applicableSports
        ? bonus.applicableSports.split(',').slice(0, 3).join(', ') +
        (bonus.applicableSports.split(',').length > 3 ? '...' : '')
        : bonus.applicableType || 'All Sports',
      date: new Date(bonus.createdDate),
      expiryDate: new Date(bonus.validUntil),
      expired: new Date(bonus.validUntil) < new Date(),
      value: bonus.instantBonus || bonus.maxBonus || 0,

      bonusUsageCurrent: Math.floor(bonus.wagerCriteria * 0.3),
      bonusUsageTotal: bonus.wagerCriteria || 100,
    };
  } catch (error) {
    console.error('Error transforming bonus data:', error, bonus);
    return {
      ...bonus,
      name: `Bonus ${bonus.id}`,
      type: bonus.bonusType || 'UNKNOWN',
      applicableTo: 'All Sports',
      date: new Date(),
      expiryDate: new Date(),
      expired: false,
      value: 0,
      bonusUsageCurrent: 0,
      bonusUsageTotal: 100,
    };
  }
};

export const handleRegisterBonusesResponse = (
  response: AxiosResponse<ServiceResponse<RegisterBonusesResponseData>>,
): RegisterBonus[] => {
  try {

    const result = handleResponse(response);

    let bonusData: RegisterBonus[] = [];

    if (result?.data?.result?.data) {
      bonusData = result.data.result.data;
    } else if (result?.data?.data?.data) {
      bonusData = result.data.data.data;
    } else if (result?.data?.data) {
      bonusData = result.data.data;
    } else {
      return [];
    }

    if (!Array.isArray(bonusData)) {
      return [];
    }

    const transformedBonuses = bonusData.map(transformBonusData);

    return transformedBonuses;
  } catch (error) {
    throw error;
  }
};