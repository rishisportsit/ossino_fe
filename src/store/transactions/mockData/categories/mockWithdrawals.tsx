import { CURRENCIES } from "constants/currencies";
import { TRANSACTION_STATUS } from "store/transactions/constants";
import { type WithdrawTransaction } from "store/transactions/types";

export const withdrawTransactions: WithdrawTransaction[] = [
  {
    userId: 1, date: { day: '15 Aug 2024', time: '14:02' }, transactionId: '45321312727171839292', currency: CURRENCIES.Tether,  amount: 0.02850400, status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, date: { day: '15 Aug 2024', time: '14:02' }, transactionId: '45321312727171839292', currency: CURRENCIES.Tether,  amount: 0.02850400, status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, date: { day: '17 Nov 2024', time: '14:02' }, transactionId: '45321312727171839292', currency: CURRENCIES.Tether,  amount: 0.02850400, status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, date: { day: '15 Aug 2024', time: '14:02' }, transactionId: '45321312727171839292', currency: CURRENCIES.Tether,  amount: 0.02850400, status: TRANSACTION_STATUS.Pending
  },
  {
    userId: 1, date: { day: '15 Aug 2024', time: '14:02' }, transactionId: '45321312727171839292', currency: CURRENCIES.Tether,  amount: 0.02850400, status: TRANSACTION_STATUS.Pending
  },
  {
    userId: 1, date: { day: '15 Aug 2024', time: '14:02' }, transactionId: '888321312727171839292', currency: CURRENCIES.Tether,  amount: 0.02850400, status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, date: { day: '15 Aug 2024', time: '14:02' }, transactionId: '45321312727171839292', currency: CURRENCIES.Tether,  amount: 0.02850400, status: TRANSACTION_STATUS.Success 
  },
  {
    userId: 1, date: { day: '15 Aug 2024', time: '14:02' }, transactionId: '45321312727171839292', currency: CURRENCIES.Tether,  amount: 0.02850400, status: TRANSACTION_STATUS.Success
  },
  {
    userId: 1, date: { day: '15 Aug 2024', time: '14:02' }, transactionId: '45321312727171839292', currency: CURRENCIES.Tether,  amount: 0.02850400, status: TRANSACTION_STATUS.Failed
  },
  {
    userId: 1, date: { day: '15 Aug 2024', time: '14:02' }, transactionId: '45321312727171839292', currency: CURRENCIES.Tether,  amount: 0.02850400, status: TRANSACTION_STATUS.Success
  },
]