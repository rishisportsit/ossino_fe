import { type RootState } from 'store/index';

export const selectWalletCurrencies = (state: RootState) => state.wallet.currencies;

export const selectWalletAddresses = (state: RootState) => state.wallet.addresses;

export const selectWalletState = (state: RootState) => state.wallet;