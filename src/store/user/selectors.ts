import { type RootState } from '..';

export const selectIsLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectUserData = (state: RootState) => state.user.data;
export const selectUserBalance = (state: RootState) =>
  state.user.data?.pointsBalance;
export const selectUserBalances = (state: RootState) =>
  state.user.data?.balances;
export const selectIsVipUser = (state: RootState) => 
  state.user.data?.vip === true;
