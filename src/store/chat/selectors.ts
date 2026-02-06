import type { RootState } from '..';

export const selectIsChatOpen = (state: RootState) => state.chat.isChatOpen;
