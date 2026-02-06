export type CurrencyType = "" | "FIAT" | "CRYPTO"

export type WalletCurrencyRequestData = {
  currencyCode?: string;
  currencyType?: CurrencyType;
};



export interface WalletCurrency {
  userId: number;
  currencyName: string;
  deposit: number;
  withdrawals: number;
  totalBalance: number;
  currencyCode: string;
  currencyType: string;
  multiplier: number;
  userDefaultCurrency: boolean;
  userActiveCurrency: boolean;
  brandDefaultCurrency: boolean;
  brandActiveCurrency: boolean;
}

export interface WalletListResult {
  status: number;
  data: WalletCurrency[];
  message: string;
}

export interface WalletListResponse {
  status: number;
  data: WalletCurrency[];
  message: string;
}



export type WalletAddressRequestData = {
  currencyCode?: string;
};

export interface WalletAddress {
  id: number;
  userCryptowalletId: number;
  userId: number;
  vaultId: number;
  currencyCode: string;
  address: string;
  legacyAddress: string;
  addressFormat: string;
  bip44AddressIndex: number;
  cashAccountId: number;
  enterpriseAddress: string;
  description?: string;
  tag: string;
  type: string; 
  userDefined: boolean;
}

export interface WalletAddressListResponse {
  status: number;
  data: WalletAddress[];
  message: string;
}