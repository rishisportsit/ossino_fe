import type { ReactNode } from "react";

export type WalletTab = 'deposit' | 'withdraw' | 'buy-crypto' | 'tip';

export type WalletCategory = {
  type: WalletTab;
  title: string;
  content: ReactNode;
};
