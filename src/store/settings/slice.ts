import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SettingsApi } from 'api/settings/settings.api';
import { handleResponse } from 'store/helpers/handleResponse';
import { handleError } from 'store/helpers/handleError';
import { STORAGE_KEYS } from 'constants/storage';
import { LocalStorageHelper } from 'helpers/storage';
import type { ErrorState } from 'store/types/Error';
import type { GetPlayerDetailsResponseData, UpdatePlayerDetailsRequest, UpdatePlayerResponse, SelfExclusionResponse } from 'api/settings/settings.types';
import type { RootState } from 'store/index';

export const getPlayerDetails = createAsyncThunk<
  GetPlayerDetailsResponseData,
  void,
  { rejectValue: ErrorState }
>(
  'settings/getPlayerDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await SettingsApi.getPlayerDetails();
      return handleResponse(response);
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  }
);

export const updatePlayerDetails = createAsyncThunk<
  UpdatePlayerResponse,
  { data: UpdatePlayerDetailsRequest; file?: File },
  { rejectValue: ErrorState }
>(
  'settings/updatePlayerDetails',
  async ({ data, file }, { rejectWithValue }) => {
    try {
      const response = await SettingsApi.updatePlayerDetails(data, file);
      return handleResponse(response);
    } catch (error) {
      const customErrorMessages = {
        4999: {
          message: 'File size exceeds the 500KB limit',
          details: 'Please select a smaller image file'
        },
        500: {
          message: 'File size exceeds the 500KB limit',
          details: 'Please select a smaller image file'
        },
      };

      const errorState = handleError(error, customErrorMessages);
      return rejectWithValue(errorState);
    }
  }
);

export const deleteAccount = createAsyncThunk<
  SelfExclusionResponse,
  void,
  { rejectValue: ErrorState; state: RootState }
>(
  'settings/deleteAccount',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) as string;
      const { selectedCurrency } = state.wallet;

      if (!accessToken) {
        return rejectWithValue({
          message: 'Authentication required',
          details: 'Please log in to continue'
        });
      }

      // Use USDT as default currency code if no currency is selected
      const currencyCode = selectedCurrency?.currencyCode || 'USDT';

      const requestData = {
        accessToken,
        selfExclusion: 'PERMANENT',
        selfExclusionReason: 'Addiction',
        currencyCode
      };

      const response = await SettingsApi.updateUserLimits(requestData);
      return response;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  }
);

type UploadedFileMeta = {
  name: string;
  size: number;
  type: string;
} | null;

type SettingsState = {
  playerDetails: GetPlayerDetailsResponseData | null;
  loading: boolean;
  error: ErrorState | null;
  uploadedFile: UploadedFileMeta;
  uploadedFilePreview: string | null;
  deleteAccountLoading: boolean;
};

const initialState: SettingsState = {
  playerDetails: null,
  loading: false,
  error: null,
  uploadedFile: null,
  uploadedFilePreview: null,
  deleteAccountLoading: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUploadedFile: (state, action) => {
      // Only store serializable file meta in Redux
      const file = action.payload.file;
      state.uploadedFile = file
        ? { name: file.name, size: file.size, type: file.type }
        : null;
      state.uploadedFilePreview = action.payload.preview;
    },
    clearUploadedFile: (state) => {
      state.uploadedFile = null;
      state.uploadedFilePreview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.playerDetails = action.payload;

        // Store btag or userRefCode as code in localStorage
        const code = action.payload.userOtherInfo?.affliateBtag || action.payload.userRefCode || '';
        if (code) {
          LocalStorageHelper.setItem(STORAGE_KEYS.code, code);
        }
      })
      .addCase(getPlayerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorState;
      })
      .addCase(updatePlayerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlayerDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Update the player details with the returned data

        if (action.payload && state.playerDetails && action.payload.result?.data) {
          // Use the correct path from UpdatePlayerResponse type
          const updatedData = action.payload.result.data;

          state.playerDetails = {
            ...state.playerDetails,
            ...updatedData,
          };
        } else {
          console.warn('Invalid payload structure or missing data:', action.payload);
        }
      })
      .addCase(updatePlayerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorState;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.deleteAccountLoading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.deleteAccountLoading = false;
        // Account deletion successful - user will be logged out
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.deleteAccountLoading = false;
        state.error = action.payload as ErrorState;
      });
  },
});

export const { setUploadedFile, clearUploadedFile } = settingsSlice.actions;
export default settingsSlice.reducer; 