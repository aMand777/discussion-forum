import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
// import responseStatusReducer from './status/reducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import responseStatusReducer from './status/responseStatusSlice';
// import isPreloadReducer from './isPreload/reducer';
// import talkDetailReducer from './talkDetail/reducer';
// import talksReducer from './talks/reducer';
// import usersReducer from './users/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    responseStatus: responseStatusReducer,
    // isPreload: isPreloadReducer,
    // users: usersReducer,
    // talks: talksReducer,
    // talkDetail: talkDetailReducer,
    loadingBar: loadingBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;