import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './slice/auth-user-slice';
import toastReducer from './slice/toast-slice';
import threadsReducer from './slice/threads-slice';
import usersReducer from './slice/users-slice';
import createReducer from './slice/create-slice';
import leaderBoardReducer from './slice/leaderboards-slice';
import detailThreadsReducer from './slice/detail-thread-slice';
import voteThreadReducer from './slice/vote-thread-slice';
import voteCommentReducer from './slice/vote-comment-slice';
import preloadReducer from './slice/preload-slice';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    toast: toastReducer,
    threads: threadsReducer,
    users: usersReducer,
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
