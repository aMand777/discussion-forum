import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_ALL_THREADS } from '../../services/threads.services';

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
  threads: Thread[];
}

const initialState: ThreadsState = {
  threads: [],
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads(state, action: PayloadAction<Thread[]>) {
      state.threads = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllThreadsStateAsync.pending, (state) => {
        console.log('Loading..');
        state.threads = [];
      })
      .addCase(getAllThreadsStateAsync.fulfilled, (state, action: PayloadAction<Thread[]>) => {
        state.threads = action.payload;
      })
      .addCase(getAllThreadsStateAsync.rejected, () => {
        console.log('Failed..');
      });
  },
});

export const getAllThreadsStateAsync = createAsyncThunk('threads/getAllThreads', async () => {
  const response = await GET_ALL_THREADS();
  // console.log('response===>', response.data.threads);
  return response.data.threads;
});

export const { setThreads } = threadsSlice.actions;

export default threadsSlice.reducer;
