import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import auth from '../../services/auth.services.ts';
import { setToast, unSetToast } from './toast-slice.ts';
import { getUserLoginAsync } from './preload-slice.ts';
import { setAccessToken } from '../../utils/storage.ts';

interface AuthUserState {
  isLoading: boolean;
  message: string;
}

const initialState: AuthUserState = {
  isLoading: false,
  message: '',
};

interface PostUserLogin {
  email: string
  password: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading(state) {
      return { ...state, isLoading: true };
    },
    setAuthSuccess(state) {
      return { ...state, isLoading: false };
    },
    setAuthFailed(state, action) {
      return { ...state, isLoading: false, message: action.payload.message };
    },
  },
});

export const { setAuthLoading, setAuthSuccess, setAuthFailed } = authSlice.actions;

export const postUserLoginAsync = createAsyncThunk(
  'auth/postUserLogin',
  async (user: PostUserLogin, { dispatch }) => {
    dispatch(setAuthLoading());
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await auth.postLogin(user);
      if (response.status === 'success') {
        const { token } = response.data;
        setAccessToken('accessToken', token);
        dispatch(getUserLoginAsync());
        dispatch(hideLoading());
        dispatch(setAuthSuccess());
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setAuthFailed({ message: error.data.message }));
      dispatch(setToast({ status: 'warning', message: error.data.message }));
      dispatch(hideLoading());
    }
  },
);

export default authSlice.reducer;
