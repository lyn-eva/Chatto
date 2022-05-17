import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
// import { roomType } from './firestoreTypes';

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: { conversations: {} },
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
