import {
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import { SidebarApi } from 'api/sidebar/sidebar.api';
import { type TopMenuItem, type BottomMenuItem } from 'api/sidebar/sidebar.types';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import { type ErrorState } from 'store/types/Error';

interface SidebarState {
  menuItems: TopMenuItem[] | null;
  bottomMenuItems: BottomMenuItem[] | null;
  selectedGameType: string;
  loading: boolean;
  error: ErrorState | null;
}

const initialState: SidebarState = {
  menuItems: null,
  bottomMenuItems: null,
  selectedGameType: 'Lobby',
  loading: false,
  error: null,
};

export const fetchTopMenu = createAppAsyncThunk(
  'sidebar/fetchTopMenu',
  async (_, { rejectWithValue }) => {
    try {
      const response = await SidebarApi.getTopMenu();
      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const fetchBottomMenu = createAppAsyncThunk(
  'sidebar/fetchBottomMenu',
  async (_, { rejectWithValue }) => {
    try {
      const response = await SidebarApi.getBottomMenu();
      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSelectedGameType: (state, action: PayloadAction<string>) => {
      state.selectedGameType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTopMenu.fulfilled,
        (state, action: PayloadAction<TopMenuItem[]>) => {
          state.loading = false;
          state.menuItems = action.payload;
        },
      )
      .addCase(fetchTopMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
      .addCase(fetchBottomMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBottomMenu.fulfilled,
        (state, action: PayloadAction<BottomMenuItem[]>) => {
          state.loading = false;
          state.bottomMenuItems = action.payload;
        },
      )
      .addCase(fetchBottomMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const { setSelectedGameType } = sidebarSlice.actions;
export default sidebarSlice.reducer;
