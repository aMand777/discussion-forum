import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_LEADERBOARDS } from '../../services/leaderboards.services';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setToast, unSetToast } from '../../states/slice/toast-slice';

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
  status: string;
  value: LeaderBoardEntry[];
}

const initialState: LeaderBoardState = {
  status: '',
  value: [],
};

export const getLeaderBoardsAsync = createAsyncThunk(
  'leaderboards/getLeaderBoardsThreads',
  async (_, {dispatch}) => {
    dispatch(setStatus('loading'))
    dispatch(unSetToast());
  dispatch(showLoading());
  try {
    const response = await GET_LEADERBOARDS();
    if (response.status === 'success') {
      dispatch(setLeaderBoards(response.data.leaderboards));
      dispatch(hideLoading());
    }
    return response.status;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    dispatch(setStatus('error'))
    dispatch(setToast({ status: 'error', message: error.data.message }));
    dispatch(hideLoading());
  }
  },
);

const leaderBoardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {
    setLeaderBoards(state, action: PayloadAction<LeaderBoardEntry[]>) {
      state.status = 'success';
      state.value = action.payload;
    },
        setStatus(state, action) {
      state.status = action.payload
    },
  },
});

export const { setLeaderBoards, setStatus } = leaderBoardsSlice.actions;

export default leaderBoardsSlice.reducer;
