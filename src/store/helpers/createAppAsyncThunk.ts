import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'store/index';
import type { RejectionError } from 'store/types/Error';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: RejectionError;
}>();
