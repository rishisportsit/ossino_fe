import type { ClientType } from 'constants/clientType';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sleep } from 'helpers/common';
import { mockSessions } from './mockData';

export const getSessions = createAsyncThunk('sessions/get', async () => {
  await sleep(1);
  return mockSessions;
});

type Status = 'online' | 'offline';

export type Session = {
  id: number;
  deviceType: ClientType;
  deviceName: string;
  country: string;
  status: Status;
  lastVisited: Date;
};

type SessionsState = {
  data: Session[] | null;
  loading: boolean;
  error: Error | null;
};

const initialState: SessionsState = {
  data: null,
  loading: false,
  error: null,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    deleteSession: (state, action) => {
      state.data =
        state.data?.filter((session) => session.id !== action.payload) ??
        state.data;
    },
    deleteAllSessions: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessions.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
        state.data = null;
      });
  },
});

export default sessionsSlice.reducer;
export const { deleteAllSessions, deleteSession } = sessionsSlice.actions;