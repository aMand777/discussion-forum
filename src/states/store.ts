import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './slice/authUser-slice'
import toastReducer from './slice/toast-slice'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store