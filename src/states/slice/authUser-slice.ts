import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_USER_LOGGED_IN } from '../../services/users.services';

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

export const getUserLoginAsync = createAsyncThunk('authUser/getUserLogin', async () => {
  try {
    return await GET_USER_LOGGED_IN();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error;
  }
});

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUserLoginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLoginAsync.fulfilled, (state, action) => {
        if (action.payload.status === 'success') {
          state.isAuthenticated = true;
          state.data = action.payload.data.user;
        } else {
          state.isAuthenticated = false;
        }
        state.isLoading = false;
      })
      .addCase(getUserLoginAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authUserSlice.reducer;
