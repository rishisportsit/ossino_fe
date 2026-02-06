import type { CmsPromotionResponse } from 'api/content/content.types';

export type PromotionDialogData = {
  cmsData: CmsPromotionResponse;
};

export type CasinoBonusData = {
  background: string;
  minDeposit: number;
  rollover: number;
  percentage: number;
  bonusUpTo: number;
};

export type { CmsPromotionResponse } from 'api/content/content.types';