import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_ALL_USERS } from '../../services/users.services';

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
      state.users = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAsync.pending, (state) => {
        console.log('Loading..');
        state.users = [];
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      })
      .addCase(getAllUsersAsync.rejected, () => {
        console.log('Failed..');
      });
  },
});

export const getAllUsersAsync = createAsyncThunk('users/getAllUsers', async () => {
  const response = await GET_ALL_USERS();
  console.log('response==>', response.data.users);
  return response.data.users
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
