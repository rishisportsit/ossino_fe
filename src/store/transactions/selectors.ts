import { CryptoCurrencyEntity, CURRENCIES, CURRENCY_CODE_MAPPING } from 'constants/currencies';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { TRANSACTION_STATUS } from './constants';
import { type ApiDepositTransaction, type DepositTransaction, type ApiWithdrawTransaction, type WithdrawTransaction, CURRENCY_CODE_TO_NAME } from './types';
import { parseUTCTimestamp } from 'helpers/transactions/formatDate';

/**
 * @param dateString - UTC timestamp string
 * @returns 
 */
const formatDate = (dateString: string) => {
  const date = parseUTCTimestamp(dateString);
  return {
    day: date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    time: date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  };
};
const getCurrencyFromCode = (currencyCode: string | null): CryptoCurrencyEntity => {
  if (!currencyCode) return CURRENCIES.Tether;

  const currencyName = CURRENCY_CODE_TO_NAME[currencyCode];
  return currencyName ? CURRENCIES[currencyName] : CURRENCIES.Tether;
};
export const isValidCurrencyCode = (code: string) => {
  return code in CURRENCY_CODE_MAPPING;
};
export const selectUserDeposits = createSelector(
  [
    (state: RootState) => state.user.data?.id,
    (state: RootState) => state.transactions.data.deposits as ApiDepositTransaction[],
  ],
  (userId, deposits) => {
    if (!userId) return [];
    return deposits
      .filter((deposit) => deposit.userId === userId)
      .map((deposit) => ({
        userId: deposit.userId,
        date: formatDate(deposit.createdDate),
        amount: deposit.amount,
        currency: getCurrencyFromCode(deposit.currencyCode),
        status: deposit.status || TRANSACTION_STATUS.Success
      })) as DepositTransaction[];
  }
);

export const selectUserWithdrawals = createSelector(
  [
    (state: RootState) => state.user.data?.id,
    (state: RootState) => state.transactions.data.withdrawals,
  ],
  (userId, withdrawals) => {
    if (!userId) return [];
    return (withdrawals as ApiWithdrawTransaction[])
      .filter((transaction) => transaction.userId === userId)
      .map((withdrawal) => ({
        userId: withdrawal.userId,
        date: formatDate(withdrawal.createdDate),
        amount: withdrawal.amount,
        currency: withdrawal.currencyCode ? CURRENCIES[withdrawal.currencyCode] : CURRENCIES.Tether,
        transactionId: withdrawal.transactionId,
        status: withdrawal.status || TRANSACTION_STATUS.Success
      })) as WithdrawTransaction[];
  }
);

export const selectUserSportsBets = ({ user: { data }, transactions: { data: { sportsBets } } }: RootState) => {
  if (!data?.id) return [];

  return sportsBets.filter(
    (bet) => bet.userId === data.id
  );
};

export const selectUserCasinoBets = (state: RootState) => {
  return state.transactions?.data?.casinoBets?.data?.data
};

export const selectUserCasinoBetsRounds = ({ user: { data }, transactions: { data: { casinoBetRounds } } }: RootState) => {
  if (!data?.id) return [];

  return casinoBetRounds;
}

export const selectUserSportsBetHistory = (state: RootState) => {
  return state.transactions?.data?.sportsBetsData || []
};

export const selectUserTips = ({ user: { data }, transactions: { data: { tips } } }: RootState) => {
  if (!data?.id) return [];

  return tips.filter(
    (tip) => tip.senderId === data.id || tip.receiverId === data.id || tip.userId === data.id
  );
};
