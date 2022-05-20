import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { FieldValue } from 'firebase/firestore';

export interface roomType {
  created: { seconds: string; nanoseconds: string };
  members: string[];
  owner: string;
  other: string;
  type: string;
  updated: { seconds: string; nanoseconds: string };
  id: string;
  lastActivePerson: string
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
