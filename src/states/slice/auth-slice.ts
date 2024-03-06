import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { POST_LOGIN } from '../../services/auth.services';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setToast, unSetToast } from './toast-slice';
import { getUserLoginAsync } from './preload-slice'
import { setAccessToken } from '../../utils/storage';

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

export const postUserLoginAsync = createAsyncThunk(
  'auth/postUserLogin',
  async (user: PostUserLogin, { dispatch }) => {
    dispatch(setAuth());
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await POST_LOGIN(user);
      if (response.status === 'success') {
        const { token } = response.data;
        setAccessToken('accessToken', token)
        dispatch(getUserLoginAsync());
        dispatch(hideLoading());
        dispatch(setAuthSuccess())
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setAuthFailed({ message: error.data.message }));
      dispatch(setToast({ status: 'warning', message: error.data.message }));
      dispatch(hideLoading());
    }
  },
);

const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuth(state) {
      state.isLoading = true
    },
    setAuthSuccess(state) {
      state.isLoading = false
    },
    setAuthFailed(state, action) {
      state.isLoading = false
      state.message = action.payload.message
    },
  },
});

export const { setAuth, setAuthSuccess, setAuthFailed } = authSlice.actions;

export default authSlice.reducer;
