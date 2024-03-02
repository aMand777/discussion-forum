import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_USER_LOGGED_IN } from '../../services/users.services';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setToast, unSetToast } from '../../states/slice/toast-slice';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthUser {
  isAuthenticated: boolean;
  isLoading: boolean;
  data: UserData;
}

const initialState: AuthUser = {
  isAuthenticated: false,
  isLoading: true,
  data: {
    id: '',
    name: '',
    email: '',
    avatar: '',
  },
};

export const getUserLoginAsync = createAsyncThunk(
  'authUser/getUserLogin',
  async (_, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await GET_USER_LOGGED_IN();
      if (response.status === 'success') {
        dispatch(setAuthUser(response.data.user));
        dispatch(hideLoading());
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
      dispatch(unSetAuthUser());
    }
  },
);

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    unSetAuthUser(state) {
      state.data = initialState.data;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { setAuthUser, unSetAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
