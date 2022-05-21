import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ConversationType {
  id: string;
  msg: string;
  senderId: string;
  updated: { nanoseconds: string; seconds: string };
}

export interface ConversationsType {
  [key: string]: ConversationType[];
}

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {} as ConversationsType,
  reducers: {
    syncConversations: (state, action) => {
      state.conversations = {
        ...state.conversations,
        [action.payload.id]: action.payload.value,
      };
    },
  },
});

export const selectConversations = (state: RootState) => state.conversations;
export const { syncConversations } = conversationSlice.actions;
export default conversationSlice.reducer;
