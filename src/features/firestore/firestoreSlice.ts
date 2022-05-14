import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { roomType } from './firestoreTypes';

interface syncActionType extends roomType {
  type: string;
}

interface initialType {
  rooms: roomType[]
}
const firestoreSlice = createSlice({
  name: 'firestore',
  initialState: { rooms: [] as roomType[]},
  reducers: {
    syncRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const selectFirestore = (state : RootState) => state.firestore;
export const { syncRooms } = firestoreSlice.actions;
export default firestoreSlice.reducer;
