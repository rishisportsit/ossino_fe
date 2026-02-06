import { CURRENCIES } from "constants/currencies";
import { TRANSACTION_STATUS } from "store/transactions/constants";
import type { DepositTransaction } from "store/transactions/types";


export const depositTransactions: DepositTransaction[] = [
  {
    userId: 1, 
    date: { day: '16 Aug 2024', time: '14:02' },
    amount: 0.05850400,
    currency: CURRENCIES.Tether,
    status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, 
    date: { day: '18 Aug 2024', time: '14:02' },
    amount: 0.82850400,
    currency: CURRENCIES.Tether,
    status: TRANSACTION_STATUS.Failed
  },
  {
    userId: 1, 
    date: { day: '15 Aug 2024', time: '14:02' },
    amount: 0.02850400,
    currency: CURRENCIES.Tether,
    status: TRANSACTION_STATUS.Pending
  },
  {
    userId: 1, 
    date: { day: '15 Aug 2024', time: '14:02' },
    amount: 0.02850400,
    currency: CURRENCIES.Tether,
    status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, 
    date: { day: '15 Aug 2024', time: '14:02' },
    amount: 0.02850400,
    currency: CURRENCIES.Tether,
    status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, 
    date: { day: '15 Aug 2024', time: '14:02' },
    amount: 0.02850400,
    currency: CURRENCIES.Tether,
    status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, 
    date: { day: '15 Aug 2024', time: '14:02' },
    amount: 0.02850400,
    currency: CURRENCIES.Tether,
    status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, 
    date: { day: '15 Aug 2024', time: '14:02' },
    amount: 0.02850400,
    currency: CURRENCIES.Tether,
    status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, 
    date: { day: '15 Aug 2024', time: '14:02' },
    amount: 0.02850400,
    currency: CURRENCIES.Tether,
    status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, 
    date: { day: '15 Aug 2024', time: '14:02' },
    amount: 0.02850400,
    currency: CURRENCIES.Tether,
    status: TRANSACTION_STATUS.Success
  },
];
