import orderBy from 'lodash.orderby';
import { SORT_FIELD } from 'store/transactions/constants';
import type {
  DepositTransaction,
  WithdrawTransaction,
  TipTransaction,
  SportBet,
  SortField,
  CasinoBet,
  SportsBetData,
} from 'store/transactions/types';

export const sortRawTransactions = (
  rawTransactions: Array<
    DepositTransaction | WithdrawTransaction | TipTransaction | SportBet | SportsBetData | CasinoBet
  >,
  sortType: SortField,
  order: 'asc' | 'desc',
): Array<
  DepositTransaction | WithdrawTransaction | TipTransaction | SportBet | SportsBetData | CasinoBet
> => {
  if (rawTransactions.length === 0) {
    return [];
  }

  const transactionsWithDate = rawTransactions.filter(
    (
      transaction,
    ): transaction is
      | DepositTransaction
      | WithdrawTransaction
      | TipTransaction => {
      return 'date' in transaction;
    },
  );

  if (sortType === SORT_FIELD.DATE) {
    if (transactionsWithDate.length > 0) {
      return orderBy(
        transactionsWithDate,
        [
          (transaction) => new Date(transaction.date.day),
          (transaction) => transaction.date.time,
        ],
        [order, order],
      );
    }
    return rawTransactions;
  }

  return orderBy(rawTransactions, [sortType], order);
};
