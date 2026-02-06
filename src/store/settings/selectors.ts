import { type RootState } from '..';

export const selectPlayerDetails = (state: RootState) => state.settings.playerDetails;
export const selectPlayerDetailsLoading = (state: RootState) => state.settings.loading;
export const selectPlayerDetailsError = (state: RootState) => state.settings.error;
export const selectUploadedFile = (state: RootState) => state.settings.uploadedFile;
export const selectUploadedFilePreview = (state: RootState) => state.settings.uploadedFilePreview; 