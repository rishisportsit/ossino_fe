import type { WalletCategory } from 'store/transactions/mockData/wallet/types';
import BuyCryptoForm from '../BuyCryptoForm';
import DepositForm from '../DepositForm';
import TipForm from '../TipForm';
import WithdrawForm from '../WithdrawForm';

export const walletCategories: WalletCategory[] = [
  {
    type: 'deposit',
    title: 'Deposit',
    content: <DepositForm />
  },
  {
    type: 'withdraw',
    title: 'Withdraw',
    content: <WithdrawForm />
  },
  {
    type: 'buy-crypto',
    title: 'Buy Crypto',
    content: <BuyCryptoForm />
  },
  {
    type: 'tip',
    title: 'Tip',
    content: <TipForm />
  },
];
