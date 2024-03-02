import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setToast, unSetToast } from './toast-slice';
import { getUserLoginAsync } from './preload-slice';
import { setAccessToken } from '../../utils/storage';
import { POST_REGISTER_USER } from '../../services/register.services';

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

interface RegisterState {
  isLoading: boolean;
  message: string;
  status: string;
}

const initialState: RegisterState = {
  isLoading: false,
  message: '',
  status: '',
};

export const registerUserAsync = createAsyncThunk(
  'register/registerUserLogin',
  async (user: RegisterUser, { dispatch }) => {
    dispatch(setRegister());
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await POST_REGISTER_USER(user);
      if (response.status === 'success') {
        const { token } = response.data;
        setAccessToken('accessToken', token);
        dispatch(getUserLoginAsync());
        dispatch(hideLoading());
        dispatch(setRegisterSuccess());
        dispatch(setToast({ status: 'success', message: response.message }));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setRegisterFailed({ message: error.data.message }));
      dispatch(setToast({ status: 'warning', message: error.data.message }));
      dispatch(hideLoading());
    }
  },
);

const registerSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setRegister(state) {
      state.isLoading = true;
    },
    setRegisterSuccess(state) {
      state.isLoading = false;
      state.status = 'success'
    },
    setRegisterFailed(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
    },
  },
});

export const { setRegister, setRegisterSuccess, setRegisterFailed } = registerSlice.actions;

export default registerSlice.reducer;
