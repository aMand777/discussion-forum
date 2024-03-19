import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import users from '../../services/users.services.ts';
import { setAuthUser, unSetAuthUser } from './user-slice.ts';

export interface PreloadState {
  isPreload: boolean;
  isAuthenticated: boolean;
}

const initialState: PreloadState = {
  isPreload: true,
  isAuthenticated: false,
};

const preloadSlice = createSlice({
  name: 'preload',
  initialState,
  reducers: {
    setPreload(state) {
      return { ...state, isPreload: true, isAuthenticated: false };
    },
    setPreloadSuccess(state) {
      return { ...state, isPreload: false, isAuthenticated: true };
    },
    setPreloadFailed(state) {
      return { ...state, isPreload: false, isAuthenticated: false };
    },
  },
});

export const { setPreload, setPreloadSuccess, setPreloadFailed } = preloadSlice.actions;

export const getUserLoginAsync = createAsyncThunk(
  'authUser/getUserLogin',
  async (_, { dispatch }) => {
    dispatch(setPreload());
    dispatch(showLoading());
    try {
      const response = await users.getOwnProfile();
      if (response.status === 'success') {
        dispatch(setAuthUser(response.data.user));
        dispatch(setPreloadSuccess());
        dispatch(hideLoading());
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(unSetAuthUser());
      dispatch(setPreloadFailed());
      dispatch(hideLoading());
    }
  },
);

export default preloadSlice.reducer;
