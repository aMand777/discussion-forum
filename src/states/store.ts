import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './slice/authUser-slice'
import toastReducer from './slice/toast-slice'
import threadsReducer from './slice/threads-slice'
import usersReducer from './slice/users-slice'
import leaderBoardReducer from './slice/leaderboards-slice'
import { loadingBarReducer } from 'react-redux-loading-bar'
import detailThreadsReducer from './slice/detail-thread-slice'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    toast: toastReducer,
    threads: threadsReducer,
    users: usersReducer,
    leaderBoards: leaderBoardReducer,
    loadingBar: loadingBarReducer,
    detailThread: detailThreadsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store