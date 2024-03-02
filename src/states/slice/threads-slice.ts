import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_ALL_THREADS } from '../../services/threads.services';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setToast, unSetToast } from '../../states/slice/toast-slice'

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
  value: Thread[];
}

const initialState: ThreadsState = {
  value: []
};

export const getAllThreadsStateAsync = createAsyncThunk(
  'threads/getAllThreads',
  async (_, { dispatch }) => {
    dispatch(showLoading())
    dispatch(unSetToast())
    try {
      const response = await GET_ALL_THREADS();
      if (response.status === 'success') {
        dispatch(setThreads(response.data.threads));
        dispatch(hideLoading());
      }
      return response.status;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
    }
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads(state, action: PayloadAction<Thread[]>) {
      state.value = action.payload;
    },
  },
});

export const { setThreads } = threadsSlice.actions;

export default threadsSlice.reducer;
