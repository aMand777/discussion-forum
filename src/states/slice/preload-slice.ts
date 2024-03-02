import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { GET_USER_LOGGED_IN } from '../../services/users.services';
import { setAuthUser, unSetAuthUser } from '../../states/slice/user-slice'

interface PreloadState {
  isPreload?: boolean;
  isAuthenticated?: boolean;
}

const initialState: PreloadState = {
  isPreload: true,
  isAuthenticated: false,
};

export const getUserLoginAsync = createAsyncThunk(
  'authUser/getUserLogin',
  async (_, { dispatch }) => {
    dispatch(setPreload());
    dispatch(showLoading());
    try {
      const response = await GET_USER_LOGGED_IN();
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

const preloadSlice = createSlice({
  name: 'preload',
  initialState,
  reducers: {
    setPreload(state) {
      state.isPreload = true;
      state.isAuthenticated = false;
    },
    setPreloadSuccess(state) {
      state.isPreload = false;
      state.isAuthenticated = true;
    },
    setPreloadFailed(state) {
      state.isPreload = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setPreload, setPreloadSuccess, setPreloadFailed } = preloadSlice.actions;

export default preloadSlice.reducer;
