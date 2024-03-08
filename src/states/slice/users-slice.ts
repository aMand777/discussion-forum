import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { GET_ALL_USERS } from '../../services/users.services.ts';
import { setToast } from './toast-slice.ts';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      return { ...state, users: action.payload };
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const getAllUsersAsync = createAsyncThunk(
  'users/getAllUsers',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await GET_ALL_USERS();
      if (response.status === 'success') {
        dispatch(setUsers(response.data.users));
        dispatch(hideLoading());
      }
      return response.status;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
      return error.data.message;
    }
  },
);

export default usersSlice.reducer;
