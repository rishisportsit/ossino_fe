import { depositTransactions } from "store/transactions/mockData/categories/mockDeposits";
import { withdrawTransactions } from "./categories/mockWithdrawals";
import { sportsBets } from "./categories/mockedBets";
import { tipsTransactions } from "./categories/mockTips";

export const transactions = {
  deposits: [...depositTransactions],
  withdrawals: [...withdrawTransactions],
  sportsBets: [...sportsBets],
  tips: [...tipsTransactions]
}

export type Transactions = typeof transactions;