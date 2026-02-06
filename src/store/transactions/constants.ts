export const SORT_STATE = {
  DESC: 'desc',
  ASC: 'asc',
  NONE: 'none',
} as const;

export const SORT_FIELD = {
  DATE: 'date',
  AMOUNT: 'amount',
  TRANSACTION_ID: 'transactionId',
  EVENT: 'event',
  ODDS: 'odds',
  STAKE: 'stake',
  PAYOUT: 'payout',
  USER: 'user',
  GAMENAME: 'gameName',
  PLACEDDATE: "placedDate",
  ROUNDID: "roundId",
  TOTALODDS: "totalOdds"
} as const;

export const CATEGORY = {
  Deposit: 'deposit',
  Withdraw: 'withdraw',
  SportsBets: 'bets',
  CasinoBets: 'casinoBets',
  Tips: 'tips',
} as const;

export const BET_STATUS = {
  Win: 'Success',
  Lost: 'Lost',
  Return: 'Return',
  Won: "Won",
  Running: "Running",
} as const;

export const BET_STATUS_SPORTS = {
  Won: "Won",
  CashedOut: "CashedOut",
  Lost: "Lost",
  Rejected: "REJECTED",
  accepted: "ACCEPTED"
}

export const TRANSACTION_STATUS = {
  Success: 'CONFIRMED',
  Pending: 'PENDING',
  Failed: 'FAILED',
} as const;