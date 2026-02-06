import { type RootState } from "..";

export const lastWinsSelector = (state: RootState) => state.lastWins.data;
export const selectLastWinsError = (state: RootState) => state.lastWins.error;
export const selectLastWinsLoading = (state: RootState) => state.lastWins.loading;
