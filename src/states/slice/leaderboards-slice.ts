import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import leaderboards from '../../services/leaderboards.services.ts';
import { setToast, unSetToast } from './toast-slice.ts';

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

export interface LeaderBoardState {
  status: string;
  value: LeaderBoardEntry[];
}

const initialState: LeaderBoardState = {
  status: '',
  value: [],
};

const leaderBoardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {
    setLeaderBoards(state, action: PayloadAction<LeaderBoardEntry[]>) {
      return { ...state, status: 'success', value: action.payload };
    },
    setStatus(state, action) {
      return { ...state, status: action.payload };
    },
  },
});

export const { setLeaderBoards, setStatus } = leaderBoardsSlice.actions;

export const getLeaderBoardsAsync = createAsyncThunk(
  'leaderboards/getLeaderBoardsThreads',
  async (_, { dispatch }) => {
    dispatch(setStatus('loading'));
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await leaderboards.getAll();
      if (response.status === 'success') {
        dispatch(setLeaderBoards(response.data.leaderboards));
        dispatch(hideLoading());
      }
      return response.status;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setStatus('error'));
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
      return error.data.message;
    }
  },
);

export default leaderBoardsSlice.reducer;
