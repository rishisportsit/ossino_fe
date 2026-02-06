import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { bonusesApi } from 'api/bonuses/bonuses.api';
import type { Bonus, BonusOption, GetBonusesRequest } from 'api/bonuses/bonuses.types';
import { bonuses } from './mockData';
import { sleep } from 'helpers/common';

export const getBonuses = createAppAsyncThunk('bonuses/get', async () => {
  await sleep(1);
  return bonuses;
});

export const getRegistrationBonuses = createAppAsyncThunk(
  'bonuses/getRegistration',
  async (request: GetBonusesRequest = {}, { rejectWithValue }) => {
    try {
      const response = await bonusesApi.getAllBonuses(request);
      return response.data.result.data.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const getBonusesByType = createAppAsyncThunk(
  'bonuses/getByType',
  async (applicableType: 'SPORTS' | 'CASINO' | 'ALL', { rejectWithValue }) => {
    try {
      const bonuses = await bonusesApi.getBonusesByType(applicableType);
      return bonuses;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

const transformBonusesToOptions = (bonuses: Bonus[]): BonusOption[] => {
  const options: BonusOption[] = [];
  
  const specificSportsBonuses = bonuses.filter(bonus => bonus.applicableType === 'SPORTS');
  const specificCasinoBonuses = bonuses.filter(bonus => bonus.applicableType === 'CASINO');
  const allTypeBonuses = bonuses.filter(bonus => bonus.applicableType === 'ALL');
  
  const sportsBonus = specificSportsBonuses.length > 0 ? specificSportsBonuses[0] : allTypeBonuses[0];
  
  let casinoBonus = specificCasinoBonuses.length > 0 ? specificCasinoBonuses[0] : null;
  if (!casinoBonus && allTypeBonuses.length > 0) {
    casinoBonus = sportsBonus?.applicableType === 'ALL' ? 
      (allTypeBonuses.length > 1 ? allTypeBonuses[1] : null) : 
      allTypeBonuses[0];
  }

  if (sportsBonus) {
    options.push({
      id: `sports_${sportsBonus.id}`,
      type: 'SPORTS',
      title: `Sport Bonus +${sportsBonus.bonusPercentage}%`,
      description: `Up to $${sportsBonus.maxBonus.toLocaleString()}`,
      percentage: sportsBonus.bonusPercentage,
      maxAmount: sportsBonus.maxBonus,
      icon: '/icons/soccer.svg',
    });
  }

  if (casinoBonus) {
    options.push({
      id: `casino_${casinoBonus.id}`,
      type: 'CASINO', 
      title: `Slot Bonus +${casinoBonus.bonusPercentage}%`,
      description: `Up to $${casinoBonus.maxBonus.toLocaleString()}`,
      percentage: casinoBonus.bonusPercentage,
      maxAmount: casinoBonus.maxBonus,
      icon: '/icons/cardsLogo.svg',
    });
  }

  options.push({
    id: 'none',
    type: 'NONE',
    title: 'No bonuses',
    description: "There won't be another chance",
    icon: '/icons/globalLogo.svg',
  });

  return options;
};

export type OldBonus = {
  id: number;
  date: string;
  value: number;
  type: any;
  name: string;
  applicableTo: string;
  expiryDate: string;
  expired: boolean;
  bonusUsageTotal: number;
  bonusUsageCurrent: number;
};

type BonusesState = {
  data: OldBonus[] | null;
  loading: boolean;
  error: Error | null;
  
  registrationBonuses: Bonus[] | null;
  bonusOptions: BonusOption[] | null;
  registrationLoading: boolean;
  registrationError: ErrorState | null;
};

const initialState: BonusesState = {
  data: null,
  loading: false,
  error: null,
  registrationBonuses: null,
  bonusOptions: null,
  registrationLoading: false,
  registrationError: null,
};

const bonusesSlice = createSlice({
  name: 'bonuses',
  initialState,
  reducers: {
    clearRegistrationBonuses: (state) => {
      state.registrationBonuses = null;
      state.bonusOptions = null;
      state.registrationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBonuses.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getBonuses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBonuses.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
        state.data = null;
      })
      
      .addCase(getRegistrationBonuses.pending, (state) => {
        state.registrationError = null;
        state.registrationLoading = true;
      })
      .addCase(getRegistrationBonuses.fulfilled, (state, action) => {
        state.registrationLoading = false;
        state.registrationBonuses = action.payload;
        state.bonusOptions = transformBonusesToOptions(action.payload);
      })
      .addCase(getRegistrationBonuses.rejected, (state, action) => {
        state.registrationError = action.payload ?? null;
        state.registrationLoading = false;
        state.registrationBonuses = null;
        state.bonusOptions = null;
      })
      
      .addCase(getBonusesByType.pending, (state) => {
        state.registrationError = null;
        state.registrationLoading = true;
      })
      .addCase(getBonusesByType.fulfilled, (state, action) => {
        state.registrationLoading = false;
        state.registrationBonuses = action.payload;
        state.bonusOptions = transformBonusesToOptions(action.payload);
      })
      .addCase(getBonusesByType.rejected, (state, action) => {
        state.registrationError = action.payload ?? null;
        state.registrationLoading = false;
        state.registrationBonuses = null;
        state.bonusOptions = null;
      });
  },
});

export const { clearRegistrationBonuses } = bonusesSlice.actions;
export default bonusesSlice.reducer;
