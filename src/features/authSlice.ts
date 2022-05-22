import { RootState } from '../app/store';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: {} as User },
  reducers: {
    updateAuth: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateAuth } = authSlice.actions;
export const selectAuth = (state: RootState) => state.user;
export default authSlice.reducer;
