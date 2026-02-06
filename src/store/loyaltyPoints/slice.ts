import { STORAGE_KEYS } from 'constants/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoyaltyApi } from 'api/loyalty/loyalty.api';
import { LocalStorageHelper } from 'helpers/storage';
import { config } from 'config/index';
import { loyaltyPoints as mockIcons } from './mockData';
import { ApiRewardsSummary } from 'api/loyalty/loyalty.types';

export const getLoyaltyPoints = createAsyncThunk(
  'loyaltyPoints/get',
  async () => {
    const userId = LocalStorageHelper.getItem<string>(STORAGE_KEYS.userId) ?? '';
    const platformId = Number(config.platformId ?? 1);
    const operatorId = config.operatorId ?? '';
    // Fetch loyalty history
    const requestData = {
      userId,
      brand: operatorId,
      platformId,
      operatorId,
      offset: 0,
      limit: 100,
    };
    // Call loyaltyHistory API and process its response
    const response = await LoyaltyApi.getRewardHistory(requestData);
    const txns = response?.data?.rewardPointsHistory || response?.data?.data || response?.data || [];
    const gameTypeMap: Record<string, { id: number; icon: { id: string; href: string }; title: string; points: number }> = {};
    let iconIdx = 0;
    txns.forEach((txn: any) => {
      if (txn.gameType) {
        const type = txn.gameType;
        if (!gameTypeMap[type]) {
          // Assign random icon from mockIcons
          const iconData = mockIcons[iconIdx % mockIcons.length];
          gameTypeMap[type] = {
            id: iconIdx + 1,
            icon: iconData.icon,
            title: type,
            points: 0,
          };
          iconIdx += 1;
        }
        gameTypeMap[type].points += Number(txn.coinsCredit || 0);
      }
    });
    return Object.values(gameTypeMap);
  },
);

export type LoyaltyPoint = {
  id: number;
  icon: {
    id: string;
    href: string;
  };
  title: string;
  points: number;
};

type LoyaltyPointsState = {
  data: LoyaltyPoint[] | null;
  loading: boolean;
  error: Error | null;
};

const initialState: LoyaltyPointsState = {
  data: null,
  loading: false,
  error: null,
};

const loyaltyPointsSlice = createSlice({
  name: 'loyaltyPoints',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoyaltyPoints.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getLoyaltyPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getLoyaltyPoints.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
        state.data = null;
      });
  },
});

export default loyaltyPointsSlice.reducer;
