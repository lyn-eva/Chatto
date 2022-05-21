import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import roomReducer from '../features/roomSlice';
import memberReducer from '../features/memberSlice';
import converastionReducer from '../features/conversationSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    rooms: roomReducer,
    members: memberReducer,
    conversations: converastionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
