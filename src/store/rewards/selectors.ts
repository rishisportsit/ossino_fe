import { type RootState } from '..';

// Legacy rewards selectors
export const selectRewards = (state: RootState) => state.rewards.data;
export const selectRewardsError = (state: RootState) => state.rewards.error;
export const selectRewardsLoading = (state: RootState) => state.rewards.loading;

// Mission rewards selectors
export const selectMissionRewards = (state: RootState) => state.rewards.missionRewards;
export const selectMissionRewardsError = (state: RootState) => state.rewards.missionRewardsError;
export const selectMissionRewardsLoading = (state: RootState) => state.rewards.missionRewardsLoading;

// Claim selectors
export const selectClaimingReward = (state: RootState) => state.rewards.claimingReward;
export const selectClaimError = (state: RootState) => state.rewards.claimError;
