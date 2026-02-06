import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sleep } from 'helpers/common';
import { fetchMessagesFromServer } from './api';

export type ChatData = {
  messages: Message[];
  usersCount: number;
};

export const fetchChatData = createAsyncThunk('chat', async () => {
  await sleep(500);
  const chatData = await fetchMessagesFromServer();

  return chatData;
});

type TextMessage = {
  type: 'text';
  nickName: string;
  avatarLink?: string;
  text: string;
};

type TipMessage = {
  type: 'tip';
  sender: string;
  amount: number;
  avatarLink?: string;
  receiver: string;
};

export type Message = TextMessage | TipMessage;

export type ChatUser = {
  nickName: string;
};

type ChatState = {
  isChatOpen: boolean;
  messages: Message[];
  usersCount: number; // can be changed to Users[] if needed
  loading: boolean;
  error: Error | null;
};

const initialState: ChatState = {
  isChatOpen: false,
  messages: [],
  usersCount: 0,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.isChatOpen = action.payload;
      } else {
        state.isChatOpen = !state.isChatOpen;
      }
    },
    addMessage: (state: ChatState, action) => {
      state.messages.push(action.payload);
    },
    updateUsersCount: (state: ChatState, action) => {
      state.usersCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        fetchChatData.fulfilled,
        (state, action: PayloadAction<ChatData>) => {
          state.loading = false;
          state.messages = action.payload.messages;
          state.usersCount = action.payload.usersCount;
        },
      )
      .addCase(fetchChatData.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
      });
  },
});

export const { toggleChat, addMessage, updateUsersCount } = chatSlice.actions;

export default chatSlice.reducer;
