import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setToast, unSetToast } from './toast-slice.ts';
import { getUserLoginAsync } from './preload-slice.ts';
import register from '../../services/register.services.ts';

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

const registerSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setRegister(state) {
      return { ...state, isLoading: true };
    },
    setRegisterSuccess(state) {
      return { ...state, isLoading: false, status: 'success' };
    },
    setRegisterFailed(state, action) {
      return { ...state, isLoading: false, message: action.payload.message };
    },
  },
});

export const { setRegister, setRegisterSuccess, setRegisterFailed } = registerSlice.actions;

export const registerUserAsync = createAsyncThunk(
  'register/registerUserLogin',
  async (user: RegisterUser, { dispatch }) => {
    dispatch(setRegister());
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await register.addNewUser(user);
      if (response.status === 'success') {
        dispatch(getUserLoginAsync());
        dispatch(hideLoading());
        dispatch(setRegisterSuccess());
        dispatch(setToast({ status: 'success', message: response.message }));
      }
      return response.message;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setRegisterFailed({ message: error.data.message }));
      dispatch(setToast({ status: 'warning', message: error.data.message }));
      dispatch(hideLoading());
      return error.data.message;
    }
  },
);

export default registerSlice.reducer;
