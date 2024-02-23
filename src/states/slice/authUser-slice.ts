import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<AuthUser>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isLoading = action.payload.isLoading;
      state.data = action.payload.data;
    },
    unsetAuthUser(state) {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.data = {
        id: '',
        name: '',
        email: '',
        avatar: '',
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserLoginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLoginAsync.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(getUserLoginAsync.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export const getUserLoginAsync = createAsyncThunk<UserData>('authUser/getUserLogin', async () => {
  const response = await GET_USER_LOGGED_IN();
  return response.data.user;
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
