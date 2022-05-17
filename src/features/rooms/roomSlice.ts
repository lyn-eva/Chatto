import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { roomType } from './roomTypes';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export interface createRoomAsyncType {
  owner: string;
  other: string;
  type: 'person' | 'group';
}

const roomSlice = createSlice({
  name: 'room',
  initialState: { rooms: [] as roomType[] },
  reducers: {
    syncRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const selectRooms = (state: RootState) => state.rooms;
export const { syncRooms } = roomSlice.actions;
export default roomSlice.reducer;
