import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface MemberType {
  lastActive: { nanoseconds: string; seconds: string };
}

export interface MembersType {
  [key: string]: MemberType;
}

const memberSlice = createSlice({
  name: 'member',
  initialState: {} as MembersType,
  reducers: {
    syncMembers: (state, action) => {
      state.members = {
        ...state.members,
        [action.payload.id]: action.payload.value,
      };
    },
  },
});

export const selectMembers = (state: RootState) => state.members;
export const { syncMembers } = memberSlice.actions;
export default memberSlice.reducer;
