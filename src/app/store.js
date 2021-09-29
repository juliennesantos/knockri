import { configureStore } from '@reduxjs/toolkit';
import feedReducer from '../features/feed/feedReducerSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer
  },
});
