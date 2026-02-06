import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sleep } from 'helpers/common';
import type { UserData } from 'store/user/slice';
import { users } from './mockData';

export const getAllUsers = createAsyncThunk('users/get', async () => {
  // simulate api call
  await sleep(1);
  return users;
});

export type User = Pick<
UserData,
| 'id'
| 'userName'
| 'avatar'
| 'isVip'
| 'levelImage'
| 'progress'
| 'lifetimePoints'
| 'toNextRank'
| 'pointsBalance'
| 'balances'
>;

type UsersState = {
  loading: boolean;
  error: Error | null;
  data: User[] | null;
};

const initialState: UsersState = {
  loading: false,
  error: null,
  data: users,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    receiveTip: (
      state,
      action: PayloadAction<{
        receiverId: number;
        currency: string;
        amount: number;
      }>,
    ) => {
      const receiver = state.data?.find(
        (user) => user.id === action.payload.receiverId,
      );
      if (receiver) {
        receiver.balances[action.payload.currency].balance +=
          action.payload.amount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
      });
  },
});

export const { receiveTip } = usersSlice.actions;
export default usersSlice.reducer;
