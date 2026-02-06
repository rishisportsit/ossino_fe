import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Mission } from './slice';

export const selectMissions = (state: RootState) => state.missions.data;

export const selectMissionsError = (state: RootState) => state.missions.error;

export const selectMissionsLoading = (state: RootState) =>
  state.missions.loading;

type FilteredMissions = {
  live: Mission[];
  completed: Mission[];
};

export const selectFilteredMissions = createSelector(
  selectMissions,
  (missions) => {
    if (!missions) return null;

    return missions.reduce(
      (result, mission) => {
        if (mission.prizeAwarded) {
          result.completed.push(mission);
        } else {
          result.live.push(mission);
        }
        return result;
      },
      { live: [], completed: [] } as FilteredMissions,
    );
  },
);
