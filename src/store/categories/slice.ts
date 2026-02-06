import { createSlice } from '@reduxjs/toolkit';
import { ContentApi } from 'api/content/content.api';
import { type MenuItem } from 'components/shared/MenuItem/menuItems';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { handleResponse } from './helpers';

export const getCategories = createAppAsyncThunk(
  'categories/getCategories',
  async (selectedGameType: string | undefined, { rejectWithValue }) => {
    try {
      const response = await ContentApi.getGames();
      const result = handleResponse(response, selectedGameType);
      return result;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

type CategoriesState = {
  data: MenuItem[] | null;
  loading: boolean;
  error: ErrorState | null;
};

const initialState: CategoriesState = {
  data: null,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorState;
      });
  },
});

export default categoriesSlice.reducer;
