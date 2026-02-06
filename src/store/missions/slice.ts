import { STORAGE_KEYS } from 'constants/storage';
import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import type { ErrorState } from 'store/types/Error';
import { LocalStorageHelper } from 'helpers/storage';
import { toast } from 'sonner';
import { missions } from './mockData';

export const getMissions = createAppAsyncThunk(
  'missions/get',
  async (_, { rejectWithValue }) => {
    try {
      const endpoint = '/api/v1/player/mission/challenges';
      const baseURL = import.meta.env.VITE_WRAPPER_SERVICE_URL as string;
      const operator = import.meta.env.VITE_OPERATOR_ID as string;
      const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId) as string;
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId: userId,
          operatorId: operator,
          brand: operator,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch missions');
      }
      const data = await response.json();
      if (!data || !Array.isArray(data.result)) {
        // toast.error('No missions found or invalid response');
        // return [];
        return missions;
      }
      return data.result.map((mission: any) => ({
        promotionId: String(mission.promotionId ?? ''),
        prizeType: String(mission.prizeType ?? ''),
        brandId: String(mission.brandId ?? ''),
        description: String(mission.description ?? ''),
        imageUrl: String(mission.imageUrl ?? ''),
        progress: Number(mission.progress ?? 0),
        prizeAmount: Number(mission.prizeAmount ?? 0),
        prizeAwarded: Boolean(mission.prizeAwarded ?? false),
        aggregator: String(mission.aggregator),
        providerId: String(mission.providerId),
        gameCode: String(mission.gameCode),
        operatorId: String(mission.operatorId),
      }));
    } catch (error: any) {
      toast.error('Failed to redeem prize', {
        description: error?.message || 'An error occurred',
      });
      return missions;
    }
  },
);

export type Mission = {
  promotionId: string;
  prizeType: string;
  brandId: string;
  description: string;
  imageUrl: string;
  progress: number;
  prizeAmount: number;
  prizeAwarded: boolean;
  aggregator: string;
  providerId: string;
  gameCode: string;
};

type MissionsState = {
  data: Mission[] | null;
  loading: boolean;
  error: ErrorState | null;
};

const initialState: MissionsState = {
  data: null,
  loading: false,
  error: null,
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMissions.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getMissions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getMissions.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.loading = false;
        state.data = null;
      });
  },
});

export default missionsSlice.reducer;
