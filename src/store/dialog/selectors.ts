import type { RootState } from '..';
import type { DialogId, DialogState } from './slice';

export const selectDialogById =
  <T extends DialogId>(id: T) =>
    (state: RootState): DialogState[T] =>
      state.dialog[id];
