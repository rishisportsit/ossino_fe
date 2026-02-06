import type { RootState } from "..";

export const selectSessionsData = (state: RootState) => state.sessions.data;