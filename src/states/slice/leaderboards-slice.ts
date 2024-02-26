import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_LEADERBOARDS } from '../../services/leaderboards.services';

interface LeaderBoardUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface LeaderBoardEntry {
  user: LeaderBoardUser;
  score: number;
}

interface LeaderBoardState {
  value: LeaderBoardEntry[];
}

const initialState: LeaderBoardState = {
  value: [],
};

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderBoardsAsync.pending, (state) => {
        console.log('Loading..');
        state.value = [];
      })
      .addCase(
        getLeaderBoardsAsync.fulfilled,
        (state, action: PayloadAction<LeaderBoardEntry[]>) => {
          state.value = action.payload;
        },
      )
      .addCase(getLeaderBoardsAsync.rejected, () => {
        console.log('Failed..');
      });
  },
});

export const getLeaderBoardsAsync = createAsyncThunk(
  'leaderboards/getLeaderBoardsThreads',
  async () => {
    const response = await GET_LEADERBOARDS();
    return response.data.leaderboards;
  },
);

export default leaderboardsSlice.reducer;
