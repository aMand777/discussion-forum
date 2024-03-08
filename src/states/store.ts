import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from './slice/auth-slice.ts';
import registerReducer from './slice/register-slice.ts';
import toastReducer from './slice/toast-slice.ts';
import threadsReducer from './slice/threads-slice.ts';
import usersReducer from './slice/users-slice.ts';
import userReducer from './slice/user-slice.ts';
import createReducer from './slice/create-slice.ts';
import leaderBoardReducer from './slice/leaderboards-slice.ts';
import detailThreadsReducer from './slice/detail-thread-slice.ts';
import voteThreadReducer from './slice/vote-thread-slice.ts';
import voteCommentReducer from './slice/vote-comment-slice.ts';
import preloadReducer from './slice/preload-slice.ts';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    toast: toastReducer,
    threads: threadsReducer,
    users: usersReducer,
    user: userReducer,
    leaderBoards: leaderBoardReducer,
    loadingBar: loadingBarReducer,
    detailThread: detailThreadsReducer,
    create: createReducer,
    voteThread: voteThreadReducer,
    voteComment: voteCommentReducer,
    preload: preloadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
