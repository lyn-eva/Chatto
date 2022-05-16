import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { roomType } from './firestoreTypes';

const firestoreSlice = createSlice({
  name: 'firestore',
  initialState: { rooms: [] as roomType[], conversations: {} },
  reducers: {
    syncRooms: (state, action) => {
      state.rooms = action.payload;
    },
    syncConversations: (state, action) => {
      state.conversations = {
        ...state.conversations,
        [action.payload.id]: action.payload.value,
      };
    },
  },
});

export const selectFirestore = (state: RootState) => state.firestore;
export const { syncRooms, syncConversations } = firestoreSlice.actions;
export default firestoreSlice.reducer;
