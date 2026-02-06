import type { RootState } from '..';

export const selectLevelsData = (state: RootState) =>
  state.levels.data;
