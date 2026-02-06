import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CmsPromotionResponse } from 'api/content/content.types';
import type { AuthTab } from 'components/features/auth/AuthTabs';
import { type VipSheetView } from 'components/features/overview/VipSheet';
import type { Redemption } from 'store/redemptions/slice';
import type { Session } from 'store/sessions/slice';
import type { WalletTab } from 'store/transactions/mockData/wallet/types';

export const DIALOG_TYPE = {
  login: 'login',
  logout: 'logout',
  forgotPassword: 'forgotPassword',
  passwordLink: 'passwordLink',
  newPassword: 'newPassword',
  passwordChanged: 'passwordChanged',
  kycUploadSuccess: 'kycUploadSuccess',
  coinsHistory: 'coinsHistory',
  coinsFilter: 'coinsFilter',
  levelReached: 'levelReached',
  chatRules: 'chatRules',
  vipPage: 'vipPage',
  vipPageCreated: 'vipPageCreated',
  bonuses: 'bonuses',
  promotion: 'promotion',
  wallet: 'wallet',
  tip: 'tip',
  notificationDetails: 'notificationDetails',
  notifications: 'notifications',
  withdrawn: 'withdrawn',
  deviceLogout: 'deviceLogout',
  logoutOfAllSessions: 'logoutOfAllSessions',
  changePassword: 'changePassword',
  emailVerification: 'emailVerification',
  set2FA: 'set2FA',
  editAvatar: 'editAvatar',
  deleteAccount: 'deleteAccount',
  error: 'error',
  burnCoins: 'burnCoins',
  redemption: 'redemption',
  success: 'success',
  footerContent: 'footerContent',
  search: 'search',
  betslip: 'betslip',
  p2pTradeFilter: 'p2pTradeFilter',
  p2pTradePurchaseDetails: 'p2pTradePurchaseDetails',
  p2pTradeConfirm: 'p2pTradeConfirm',
  p2pTradeDetails: 'p2pTradeDetails',
} as const;

export type DialogId = keyof typeof DIALOG_TYPE;

type BaseData = NonNullable<unknown>;
type LoginDialogData = BaseData & { tab: AuthTab; referalCode?: string };
type LevelReachedDialogData = BaseData & { level: string; image: string };
type VipPageData = BaseData & { view: VipSheetView };
type VipPageCreatedData = BaseData & { url: string };
type WalletData = BaseData & {
  tab: WalletTab;
  fromRegistration?: boolean;
  selectedBonus?: any;
};
type TipData = BaseData & { amount: string; receiver: string; sender: string };
type NotificationDetailsData = BaseData & { details: string };
type WithdrawnData = BaseData & { amount: string };
type DeviceLogoutData = BaseData & Session;
type PasswordLinkData = BaseData & { email: string };
type ErrorDialogData = BaseData & { message: string; details?: string };
type BurnCoinsData = BaseData & { value: number };
type RedemptionData = BaseData & { data: Redemption };
type SuccessDialogData = {
  title?: string;
  message: string;
  details?: string;
  buttonText?: string;
};

type FooterContentData = BaseData & {
  title: string;
  content: string;
  link?: string;
  isNewWindow?: boolean;
};
type CoinsFilterData = BaseData & {
  filters?: any;
  onApplyFilters?: (filters: any) => void;
}

type BetslipDialogData = BaseData & {
  tab: 'betslip' | 'my_bets' | 'p2p_trade';

};

export type DialogState = {
  [DIALOG_TYPE.login]: {
    open: boolean;
    data?: LoginDialogData;
  };
  [DIALOG_TYPE.logout]: {
    open: boolean;
    data?: LoginDialogData;
  };
  [DIALOG_TYPE.levelReached]: {
    open: boolean;
    data?: LevelReachedDialogData;
  };
  [DIALOG_TYPE.forgotPassword]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.passwordLink]: {
    open: boolean;
    data?: PasswordLinkData;
  };
  [DIALOG_TYPE.newPassword]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.passwordChanged]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.kycUploadSuccess]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.coinsHistory]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.coinsFilter]: {
    open: boolean;
    data?: CoinsFilterData;
  };
  [DIALOG_TYPE.chatRules]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.vipPageCreated]: {
    open: boolean;
    data?: VipPageCreatedData;
  };
  [DIALOG_TYPE.vipPage]: {
    open: boolean;
    data?: VipPageData;
  };
  [DIALOG_TYPE.bonuses]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.promotion]: {
    open: boolean;
    data?: CmsPromotionResponse;
  };
  [DIALOG_TYPE.wallet]: {
    open: boolean;
    data?: WalletData;
  };
  [DIALOG_TYPE.tip]: {
    open: boolean;
    data?: TipData;
  };
  [DIALOG_TYPE.notificationDetails]: {
    open: boolean;
    data?: NotificationDetailsData;
  };
  [DIALOG_TYPE.notifications]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.withdrawn]: {
    open: boolean;
    data?: WithdrawnData;
  };
  [DIALOG_TYPE.deviceLogout]: {
    open: boolean;
    data?: DeviceLogoutData;
  };
  [DIALOG_TYPE.logoutOfAllSessions]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.changePassword]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.emailVerification]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.set2FA]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.editAvatar]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.deleteAccount]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.error]: {
    open: boolean;
    data?: ErrorDialogData;
  };
  [DIALOG_TYPE.success]: {
    open: boolean;
    data?: SuccessDialogData;
  };
  [DIALOG_TYPE.burnCoins]: {
    open: boolean;
    data?: BurnCoinsData;
  };
  [DIALOG_TYPE.redemption]: {
    open: boolean;
    data?: RedemptionData;
  };

  [DIALOG_TYPE.footerContent]: {
    open: boolean;
    data?: FooterContentData;
  };
  [DIALOG_TYPE.search]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.betslip]: {
    open: boolean;
    data?: BetslipDialogData;
  };
  [DIALOG_TYPE.p2pTradeFilter]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.p2pTradePurchaseDetails]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.p2pTradeConfirm]: {
    open: boolean;
    data?: BaseData;
  };
  [DIALOG_TYPE.p2pTradeDetails]: {
    open: boolean;
    data?: BaseData;
  };
};

export type DialogData = DialogState[DialogId]['data'];

const initialState: DialogState = {
  forgotPassword: { open: false },
  passwordLink: { open: false },
  newPassword: { open: false },
  passwordChanged: { open: false },
  kycUploadSuccess: { open: false },
  login: { open: false },
  logout: { open: false },
  coinsHistory: { open: false },
  coinsFilter: { open: false },
  levelReached: { open: false },
  chatRules: { open: false },
  vipPage: { open: false },
  vipPageCreated: { open: false },
  bonuses: { open: false },
  promotion: { open: false },
  wallet: { open: false },
  tip: { open: false },
  notificationDetails: { open: false },
  notifications: { open: false },
  withdrawn: { open: false },
  deviceLogout: { open: false },
  logoutOfAllSessions: { open: false },
  changePassword: { open: false },
  emailVerification: { open: false },
  set2FA: { open: false },
  editAvatar: { open: false },
  deleteAccount: { open: false },
  error: { open: false },
  success: { open: false },
  burnCoins: { open: false },
  redemption: { open: false },
  footerContent: { open: false },
  search: { open: false },
  betslip: { open: false },
  p2pTradeFilter: { open: false },
  p2pTradePurchaseDetails: { open: false },
  p2pTradeConfirm: { open: false },
  p2pTradeDetails: { open: false },
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (
      state: DialogState,
      action: PayloadAction<{
        id: DialogId;
        data?: DialogData;
      }>,
    ) => {
      const { id, data } = action.payload;

      state[id].open = true;
      state[id].data = data ?? state[id].data;
    },
    closeDialog: (state, action: PayloadAction<{ id: DialogId }>) => {
      const { id } = action.payload;
      state[id].open = false;
    },
  },
});

export default dialogSlice.reducer;
export const { closeDialog, openDialog } = dialogSlice.actions;
