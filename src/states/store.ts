import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './slice/authUser-slice'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store