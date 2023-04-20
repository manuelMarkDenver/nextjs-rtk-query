import { configureStore  } from '@reduxjs/toolkit';
import counterReducer from '@/features/counters/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

import { useDispatch } from 'react-redux'
import { postsApi } from '@/features/posts/postsSlice';
import postsReducer from '@/features/posts/postsSliceThunk'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    // [postsApi.reducerPath]: postsApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(postsApi.middleware),
});

// setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()