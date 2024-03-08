import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { GET_ALL_THREADS } from '../../services/threads.services.ts';
import { setToast } from './toast-slice.ts';

interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  totalComments: number;
  upVotesBy: string[];
  downVotesBy: string[];
}

interface ThreadsState {
  status: string
  value: Thread[];
}

const initialState: ThreadsState = {
  status: '',
  value: [],
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads(state, action: PayloadAction<Thread[]>) {
      return { ...state, status: 'success', value: action.payload };
    },
    setStatus(state, action) {
      return { ...state, status: action.payload };
    },
  },
});

export const { setThreads, setStatus } = threadsSlice.actions;

export const getAllThreadsStateAsync = createAsyncThunk(
  'threads/getAllThreads',
  async (_, { dispatch }) => {
    dispatch(setStatus('loading'));
    dispatch(showLoading());
    try {
      const response = await GET_ALL_THREADS();
      if (response.status === 'success') {
        dispatch(setThreads(response.data.threads));
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

export default threadsSlice.reducer;
