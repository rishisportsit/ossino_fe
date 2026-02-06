import { CURRENCIES } from "constants/currencies";
import { TRANSACTION_STATUS } from "store/transactions/constants";
import type { TipTransaction } from "store/transactions/types";


export const tipsTransactions: TipTransaction[] = [
  {
    date: { day: '15 Aug 2024', time: '14:02' }, isPublic: true, currency: CURRENCIES.Tether, senderId: 5, receiverId: 1, amount: 12.20, status: TRANSACTION_STATUS.Success
  },
  {
    date: { day: '15 Aug 2024', time: '14:02' }, isPublic: false, currency: CURRENCIES.Tether, senderId: 1, receiverId: 5, amount: -0.10, status: TRANSACTION_STATUS.Success
  },
  {
    date: { day: '15 Aug 2024', time: '14:02' }, isPublic: true, currency: CURRENCIES.Tether, senderId: 1, receiverId: 5, amount: -0.10, status: TRANSACTION_STATUS.Pending
  },
  {
    date: { day: '15 Aug 2024', time: '14:02' }, isPublic: true, currency: CURRENCIES.Tether, senderId: 5, receiverId: 1, amount: 12.20, status: TRANSACTION_STATUS.Success
  },
  {
    date: { day: '15 Aug 2024', time: '14:02' }, isPublic: true, currency: CURRENCIES.Tether, senderId: 5, receiverId: 1, amount: 100.00, status: TRANSACTION_STATUS.Success
  },
  {
    date: { day: '15 Aug 2024', time: '14:02' }, isPublic: false, currency: CURRENCIES.Tether, senderId: 1, receiverId: 5, amount: -0.10, status: TRANSACTION_STATUS.Success
  },
  {
    date: { day: '15 Aug 2024', time: '14:02' }, isPublic: true, currency: CURRENCIES.Tether, senderId: 1, receiverId: 5, amount: -0.10, status: TRANSACTION_STATUS.Failed
  },
  {
    date: { day: '15 Aug 2024', time: '14:02' }, isPublic: true, currency: CURRENCIES.Tether, senderId: 5, receiverId: 1, amount: 100.00000194, status: TRANSACTION_STATUS.Success
  },
  {
    date: { day: '15 Aug 2024', time: '14:02' }, isPublic: true, currency: CURRENCIES.Tether, senderId: 5, receiverId: 1, amount: 12.20, status: TRANSACTION_STATUS.Success
  },
  {
    date: { day: '15 Aug 2024', time: '14:02' }, isPublic: true, currency: CURRENCIES.Tether, senderId: 5, receiverId: 1, amount: 1.02, status: TRANSACTION_STATUS.Success
  },

]