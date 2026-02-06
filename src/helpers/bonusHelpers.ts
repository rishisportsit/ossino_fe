import type { BonusOption } from 'api/bonuses/bonuses.types';
import { STORAGE_KEYS } from 'constants/storage';
import { LocalStorageHelper } from './storage';

export interface StoredBonusSelection {
  bonusOptionId: string | number;
  bonusType: 'SPORTS' | 'CASINO' | 'NONE';
  actualBonusId: number | null;
  selectedAt: string;
  bonusDetails?: {
    title: string;
    description: string;
    percentage?: number;
    maxAmount?: number;
  };
}

export const storeSelectedBonus = (bonusOption: BonusOption): void => {
  const storedBonus: StoredBonusSelection = {
    bonusOptionId: bonusOption.id,
    bonusType: bonusOption.type,
    actualBonusId: extractBonusId(bonusOption.id),
    selectedAt: new Date().toISOString(),
    bonusDetails: {
      title: bonusOption.title,
      description: bonusOption.description,
      percentage: bonusOption.percentage,
      maxAmount: bonusOption.maxAmount,
    },
  };

  LocalStorageHelper.setItem(STORAGE_KEYS.selectedBonus, storedBonus);
};

export const getStoredBonusSelection = (): StoredBonusSelection | null => {
  try {
    const stored = LocalStorageHelper.getItem<StoredBonusSelection>(STORAGE_KEYS.selectedBonus);
    return stored;
  } catch (error) {
    console.error('Failed to retrieve stored bonus selection:', error);
    clearStoredBonusSelection();
    return null;
  }
};

export const clearStoredBonusSelection = (): void => {
  LocalStorageHelper.removeItem(STORAGE_KEYS.selectedBonus);
};

export const hasPendingBonusRedirect = (): boolean => {
  const storedBonus = getStoredBonusSelection();
  return storedBonus !== null && storedBonus.bonusType !== 'NONE';
};

export const setPendingBonusRedirect = (): void => {
  LocalStorageHelper.setItem(STORAGE_KEYS.pendingBonusRedirect, 'true');
};

export const clearPendingBonusRedirect = (): void => {
  LocalStorageHelper.removeItem(STORAGE_KEYS.pendingBonusRedirect);
};

export const shouldRedirectToDeposit = (): boolean => {
  return LocalStorageHelper.getItem(STORAGE_KEYS.pendingBonusRedirect) === 'true';
};

export const extractBonusId = (bonusOptionId: string | number): number | null => {
  if (bonusOptionId === 'none') {
    return null;
  }
  
  if (typeof bonusOptionId === 'number') {
    return bonusOptionId;
  }
  
  if (bonusOptionId.includes('_')) {
    const parts = bonusOptionId.split('_');
    const idPart = parts[1];
    const numericId = parseInt(idPart, 10);
    return isNaN(numericId) ? null : numericId;
  }
  
  const numericId = parseInt(bonusOptionId, 10);
  return isNaN(numericId) ? null : numericId;
};

export const extractBonusType = (bonusOptionId: string | number): 'SPORTS' | 'CASINO' | 'NONE' => {
  if (bonusOptionId === 'none') {
    return 'NONE';
  }
  
  if (typeof bonusOptionId === 'string' && bonusOptionId.includes('_')) {
    const prefix = bonusOptionId.split('_')[0];
    if (prefix === 'sports') return 'SPORTS';
    if (prefix === 'casino') return 'CASINO';
  }
  
  return 'NONE';
};

export const findOriginalBonus = (
  bonusOptionId: string | number,
  bonusOptions: BonusOption[] | null,
  registrationBonuses: any[] | null
) => {
  if (!bonusOptions || !registrationBonuses || bonusOptionId === 'none') {
    return null;
  }
  
  const actualBonusId = extractBonusId(bonusOptionId);
  if (!actualBonusId) {
    return null;
  }
  
  return registrationBonuses.find(bonus => bonus.id === actualBonusId) || null;
};