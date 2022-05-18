import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { FieldValue } from 'firebase/firestore';

export interface conversationType {
  [key: string]: any;
  id: string;
  msg: string;
  senderId: string;
  updated: FieldValue;
}

export interface Conversations {
  [key: string]: conversationType;
}

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {} as Conversations,
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
