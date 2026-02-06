import { type AxiosResponse } from 'axios';
import { type ApiRedemption } from 'api/content/content.types';
import { type Redemption } from './slice';

export const handleResponse = (
  response: AxiosResponse<ApiRedemption[]>,
): Redemption[] => {
  const { data } = response;

  const redemptions = data.map((redemption) => ({
    id: redemption.redemptionId,
    href: redemption.logoUrl,
    name: redemption.redemptionName,
    value: redemption.redemptionPoints,
    description: redemption.redemptionDescription,
  }));

  return redemptions;
};
