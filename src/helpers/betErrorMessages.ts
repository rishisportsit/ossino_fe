export const BET_ERROR_MESSAGES: Record<string, string> = {
  'Unauthorized access or Invalid accessToken.': 'Invalid access token.Please login to place a bet.',
  'Error.': 'Place Bet Failed. Please try again.',
  'Stake is less than the minimum stake value.': 'Stake is less than the minimum stake value.',
  'Insufficient Balance': 'Insufficient Funds.',
};

export function getBetErrorMessage(errorCode?: string, fallback = 'Failed to place bet'): string {
  if (!errorCode) return fallback;
  if (BET_ERROR_MESSAGES[errorCode]) {
    return BET_ERROR_MESSAGES[errorCode];
  }
  return fallback;
}
