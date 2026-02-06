import { STORAGE_KEYS } from 'constants/storage';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from 'api/auth/auth.api';
import { PlayerApi, JavaPlayerApi } from 'api/player/player.api';
import type {
  ChangePasswordRequestData,
  ForgotPasswordRequestData,
  GoogleLoginRequestData,
  LoginRequestData,
  RegisterRequestData,
} from 'api/auth/auth.types';
import { LocalStorageHelper } from 'helpers/storage';
import type { ReactNode } from 'react';
import { ERROR_CODES, ERROR_DISPLAY } from 'store/const/errors';
import { closeDialog, DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import type { AtLeastOne } from 'store/helpers/atLeastOne';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import { handleResponse, ServiceError } from 'store/helpers/handleResponse';
import { type ErrorState } from 'store/types/Error';
import { getWalletCurrencies, resetWalletState } from 'store/wallet/slice';
import { getCoinsOverview } from 'store/coinsOverview/slice';
import { getPlayerDetails } from 'store/settings/slice';
import { handleLoginResponse } from './helpers';
import { getLoyaltyDetails } from 'store/loyaltyDetails/slice';
import { sportsBookSignalR } from '../../services/signalrService';
import axios from 'axios';

// const { sportsBookPlatformEvents } = window;

const DIALOG_STORAGE_KEYS = [
  'overview_page_dialog_shown',
  // Add other dialog keys here as needed
];

const baseURL = import.meta.env.VITE_JAVA_WRAPPER_SERVICE_URL;
// const merchantId = import.meta.env.VITE_MERCHANTID;

const clearAllDialogFlags = () => {
  DIALOG_STORAGE_KEYS.forEach((key) => {
    LocalStorageHelper.removeItem(key);
  });
};

export const fetchKycTypes = createAppAsyncThunk(
  'user/fetchKycTypes',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await PlayerApi.getKycTypes();
      const kycTypes = response.data.result.data;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(refreshUserData({ kycTypes }));
      return kycTypes;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const getPlayerBalance = createAppAsyncThunk(
  'user/getPlayerBalance',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await AuthApi.getPlayerBalance();
      const { balance } = handleResponse(response);

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(refreshUserData({ balance }));
      return null;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const login = createAppAsyncThunk(
  'user/login',
  async (data: LoginRequestData, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthApi.login(data);

      // Check for error in response and show message if present
      const respAny = response as any;
      if (
        respAny &&
        typeof respAny === 'object' &&
        respAny.data &&
        typeof respAny.data === 'object' &&
        respAny.data.error &&
        respAny.data.result &&
        typeof respAny.data.result === 'object' &&
        typeof respAny.data.result.message === 'string'
      ) {
        // Convert message to Title Case and replace _ with space
        const rawMsg = respAny.data.result.message;
        const formattedMsg = rawMsg
          .replace(/_/g, ' ')
          .toLowerCase()
          .replace(/\b\w/g, (c: any) => c.toUpperCase());
        return rejectWithValue({
          message: formattedMsg,
          details: '',
          errorDisplay: ERROR_DISPLAY.DIALOG,
        });
      }

      const { accessToken, userData } = handleLoginResponse(response);
      LocalStorageHelper.setItem(STORAGE_KEYS.accessToken, accessToken);
      LocalStorageHelper.setItem(STORAGE_KEYS.userId, userData.id.toString());

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(refreshUserData(userData));
      dispatch(closeDialog({ id: DIALOG_TYPE.login }));
      dispatch(getWalletCurrencies({}));
      dispatch(getPlayerDetails());
      dispatch(fetchKycTypes());
      dispatch(getLoyaltyDetails());

      try {
        if (sportsBookSignalR.isConnected) {
          const groupsToJoin = [
            'SB_BetStopGlobal',
            `bs_${userData.id}`,
            'bs_heartbeat'
          ];
          await sportsBookSignalR.joinGroups(groupsToJoin);
        } else {
        }
      } catch (error) {
      }
      return null;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue({
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      });
    }
  },
);

export const loginWithGoogle = createAppAsyncThunk(
  'user/loginWithGoogle',
  async (data: GoogleLoginRequestData, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthApi.loginWithGoogle(data);
      const {
        data: { authorisationToken },
      } = handleResponse(response);
      LocalStorageHelper.setItem(STORAGE_KEYS.accessToken, authorisationToken);
      const { email, firstName, lastName } = data;
      const playerDetails = await dispatch(getPlayerDetails()).unwrap();
      const userId = playerDetails.userId;
      if (userId) {
        LocalStorageHelper.setItem(STORAGE_KEYS.userId, userId.toString());
      }

      dispatch(
        refreshUserData({
          ...playerDetails,
          id: userId,
          brand: playerDetails.brand ?? '',
          email,
          userName: email,
          firstName,
          lastName,
          emailVerified: true,
        }),
      );

      dispatch(setIsLoggedIn(true));
      dispatch(closeDialog({ id: DIALOG_TYPE.login }));
      try {
        dispatch(getWalletCurrencies({}));
        dispatch(fetchKycTypes());
        await dispatch(getLoyaltyDetails()).unwrap();
        try {
          if (sportsBookSignalR.isConnected && userId) {
            const groupsToJoin = [
              'SB_BetStopGlobal',
              `bs_${userId}`,
              'bs_heartbeat'
            ];
            await sportsBookSignalR.joinGroups(groupsToJoin);
          }
        } catch (signalRError) {
        }
      } catch (err) {
      }
      return null;
    } catch (error) {
      console.error('Error in loginWithGoogle:', error);
      const errorState = handleError(error);
      return rejectWithValue({
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      });
    }
  },
);

export const register = createAppAsyncThunk(
  'user/register',
  async (data: RegisterRequestData, { dispatch, rejectWithValue }) => {
    try {
      const response = await AuthApi.register(data);
      handleResponse(response);

      await dispatch(
        login({
          password: data.password,
          userName: data.email,
        }),
      ).unwrap();
      dispatch(handlePostRegistrationActions());

      return null;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue({
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      });
    }
  },
);

export const handlePostRegistrationActions = createAppAsyncThunk(
  'user/handlePostRegistrationActions',
  async () => {
    return { isFromRegistration: true };
  },
);

export const joinUserSignalRGroups = createAppAsyncThunk(
  'user/joinUserSignalRGroups',
  async (_) => {
    try {
      const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId);
      const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);
      if (!userId || !accessToken) {
        console.log('User not logged in, skipping SignalR group joining');
        return null;
      }
      if (!sportsBookSignalR.isConnected) {
        return null;
      }
      const groupsToJoin = [
        'SB_BetStopGlobal',
        `bs_${userId}`,
        'bs_heartbeat'
      ];

      await sportsBookSignalR.joinGroups(groupsToJoin);
      return { groupsJoined: groupsToJoin };
    } catch (error) {
    }
  },
);

export const logout = createAppAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);

    try {
      if (!accessToken || typeof accessToken !== 'string') {
        throw new ServiceError({
          code: ERROR_CODES.UNAUTHORIZED,
          message: 'Unauthorized',
          details: 'Please log in again',
        });
      }

      const response = await AuthApi.logout({ accessToken });
      handleResponse(response);
    } catch (error) {
      console.log(error);
    } finally {
      const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId);
      LocalStorageHelper.removeItem(STORAGE_KEYS.accessToken);
      LocalStorageHelper.removeItem(STORAGE_KEYS.userId);
      LocalStorageHelper.removeItem(STORAGE_KEYS.code);
      LocalStorageHelper.removeItem('persist:root');
      clearAllDialogFlags();
      try {
        if (sportsBookSignalR.isConnected) {
          const groupsToLeave = [
            'SB_BetStopGlobal',
            'bs_heartbeat'
          ];
          if (userId) {
            groupsToLeave.push(`bs_${userId}`);
          }
          await sportsBookSignalR.leaveGroups(groupsToLeave);
        }
      } catch (error) {
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(resetUserData());
      dispatch(resetWalletState());
      dispatch(closeDialog({ id: DIALOG_TYPE.logout }));
      // sportsBookPlatformEvents.sendPostMessage('user-unauthorized', {});
    }

    return null;
  },
);

export const forgotPassword = createAppAsyncThunk(
  'user/forgotPassword',
  async (data: ForgotPasswordRequestData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/player/forgot/pin/request/email`,
        {
          email: data.email
        },

      );

      handleResponse(response);
      dispatch(closeDialog({ id: DIALOG_TYPE.forgotPassword }));

      dispatch(
        openDialog({
          id: DIALOG_TYPE.passwordLink,
          data: { email: data.email },
        }),
      );

      return null;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue({
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      });
    }
  },
);

export const resetPasswordWithToken = createAppAsyncThunk(
  'user/resetPasswordWithToken',
  async (data: { token: string; newPassword: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/player/forgot/email/reset/pin`,
        {
          token: data.token,
          newPassword: data.newPassword
        }
      );

      handleResponse(response);
      dispatch(closeDialog({ id: DIALOG_TYPE.newPassword }));

      dispatch(
        openDialog({
          id: DIALOG_TYPE.success,
          data: { message: 'Password reset successfully! Please log in.' },
        }),
      );

      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue({
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      });
    }
  },
);
export const changePassword = createAppAsyncThunk(
  'user/changePassword',
  async (data: ChangePasswordRequestData, { dispatch, rejectWithValue }) => {
    try {

      const response = await AuthApi.changePassword(data);
      handleResponse(response);

      dispatch(closeDialog({ id: DIALOG_TYPE.newPassword }));
      dispatch(
        openDialog({
          id: DIALOG_TYPE.success,
          data: {
            message: 'Password has been changed',
            details: 'Password has been changed successfully',
            buttonText: 'Log In',
          },
        }),
      );

      return null;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue({
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      });
    }
  },
);

export const verifyEmail = createAppAsyncThunk(
  'user/verifyEmail',
  async (email: string, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = LocalStorageHelper.getItem(
        STORAGE_KEYS.accessToken,
      ) as string;

      const response = await axios.post(
        `${baseURL}/verify/email`,
        { email, accessToken },
      );

      handleResponse(response);

      dispatch(
        openDialog({
          id: DIALOG_TYPE.success,
          data: {
            message: 'Verification Email Sent',
            details:
              'A verification email has been sent to your email address. Please check your inbox and follow the instructions to verify your email.',
          },
        }),
      );

      return null;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue({
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      });
    }
  },
);

export const uploadKyc = createAppAsyncThunk(
  'user/uploadKyc',
  async (
    data: {
      file: File;
      idType: string;
      kycType: string;
      selfie?: File;
      traceId?: string;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const accessToken = LocalStorageHelper.getItem(
        STORAGE_KEYS.accessToken,
      ) as string;

      if (!accessToken) {
        throw new ServiceError({
          code: ERROR_CODES.UNAUTHORIZED,
          message: 'Unauthorized',
          details: 'Please log in again',
        });
      }

      const response = await JavaPlayerApi.uploadKyc({
        file: data.file,
        idType: data.idType,
        kycType: data.kycType,
        selfie: data.selfie,
        traceId: data.traceId,
      }, accessToken);



      dispatch(
        openDialog({
          id: DIALOG_TYPE.success,
          data: {
            message: 'Document uploaded successfully',
            details:
              'Your verification document has been submitted. We will review it and update your status shortly.',
          },
        }),
      );

      return null;
    } catch (error) {
      console.error('=== KYC Upload Error ===');
      console.error('Error details:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        console.error('Response status:', (error as any).response?.status);
        console.error('Response data:', (error as any).response?.data);
        console.error('Response headers:', (error as any).response?.headers);
      }

      const errorState = handleError(error);
      return rejectWithValue({
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      });
    }
  },
);

type UserBalances = {
  [key: string]: {
    icon: ReactNode;
    name: string;
    contraction?: string;
    balance: number;
  };
};

export type UserData = {
  id: number;
  avatar: ReactNode;
  title: string;
  balance: number;
  pointsBalance: number;
  balances: UserBalances;
  lifetimePoints: number;
  toNextRank: number;
  progress: number;
  levelImage: string;
  vip: boolean;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  email: string;
  emailVerified: boolean;
  dateOfBirth: string;
  city: string | null;
  idVerified: boolean;
  password: string;
  passwordChanged: boolean;
  twoFactorEnabled: boolean;
  profileImage: string | null;
  level: string;
  brand: string;
  kycTypes?: string[];
  userRefCode: string | null;
  countryCode: string | null;
  affliateBtag?: string | null;
};

export type UserState = {
  loggedIn: boolean;
  loading: boolean;
  error: ErrorState | null;
  data: UserData | null;
  isFromRegistration: boolean;
};

const initialState: UserState = {
  loggedIn: false,
  loading: false,
  error: null,
  data: null,
  isFromRegistration: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    resetUserData: (state) => {
      state.data = null;
    },
    refreshUserData: (state, action: PayloadAction<AtLeastOne<UserData>>) => {
      if (state.data) {
        state.data = {
          ...state.data,
          ...action.payload,
        };
      } else {
        state.data = action.payload as UserData;
      }
    },
    updateUserBalance: (
      state,
      action: PayloadAction<{
        currency: string;
        amount: number;
      }>,
    ) => {
      const user = state.data;
      if (user) {
        user.balances[action.payload.currency].balance += action.payload.amount;
      }
    },
    clearRegistrationFlag: (state) => {
      state.isFromRegistration = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.loggedIn = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state) => {
        state.loggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
      })
      .addCase(getCoinsOverview.fulfilled, (state, action) => {
        if (state.data && action.payload?.totalCoins !== undefined) {
          state.data = {
            ...state.data,
            pointsBalance: action.payload.totalCoins,
          };
        }
      })
      .addCase(getPlayerDetails.fulfilled, (state, action) => {
        if (action.payload) {
          const userId = action.payload.userId;
          // Handle both camelCase and snake_case API responses for emailVerified

          const emailVerified = (action.payload as any).email_verified ?? false;

          state.data = {
            ...state.data,
            ...action.payload,
            id: userId,
            brand: action.payload.brand,
            emailVerified,
          } as UserData;
        }
      })
      .addCase(getWalletCurrencies.fulfilled, (state, action) => {
        if (state.data && action.payload && Array.isArray(action.payload.data)) {
          // Map wallet currencies to balances structure
          const balances: UserBalances = {};
          action.payload.data.forEach((currency) => {
            balances[currency.currencyCode] = {
              icon: '', // You can set icon logic here if needed
              name: currency.currencyName,
              contraction: currency.currencyCode,
              balance: currency.totalBalance,
            };
          });
          state.data.balances = balances;
        }
      })
      .addCase(handlePostRegistrationActions.fulfilled, (state) => {
        state.isFromRegistration = true;
      });
  },
});

export const {
  refreshUserData,
  updateUserBalance,
  setIsLoggedIn,
  resetUserData,
  clearRegistrationFlag,
} = userSlice.actions;

export { clearAllDialogFlags };

export const selectUserName = (state: any) => state.user?.data?.userName;
export const selectIsFromRegistration = (state: any) => state.user?.isFromRegistration;

export default userSlice.reducer;
