import { createSlice } from '@reduxjs/toolkit';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthUser {
  authUser: UserData;
}

const initialState: AuthUser = {
  authUser: {
    id: '',
    name: '',
    email: '',
    avatar: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload;
    },
    unSetAuthUser(state) {
      state.authUser = initialState.authUser;
    },
  },
});

export const { setAuthUser, unSetAuthUser } = userSlice.actions;

export default userSlice.reducer;
