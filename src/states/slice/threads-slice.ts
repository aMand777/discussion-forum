import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  DOWN_VOTE_THREADS,
  GET_ALL_THREADS,
  NEUTRALIZE_VOTE_THREADS,
  UP_VOTE_THREADS,
} from '../../services/threads.services';

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
  statusVote: string
}

const initialState: ThreadsState = {
  value: [],
  statusVote: ''
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    // setThreads(state, action: PayloadAction<Thread[]>) {
    //   state.value = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllThreadsStateAsync.pending, () => {
        console.log('Loading..');
      })
      .addCase(getAllThreadsStateAsync.fulfilled, (state, action: PayloadAction<Thread[]>) => {
        state.value = action.payload;
      })
      .addCase(getAllThreadsStateAsync.rejected, () => {
        console.log('Failed..');
      })
      // =========== UpVote Async Thunk ====================
      .addCase(upVoteThreadAsync.pending, (state) => {
        state.statusVote = 'pending';
      })
      .addCase(upVoteThreadAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.statusVote = action.payload;
      })
      .addCase(upVoteThreadAsync.rejected, (state) => {
        state.statusVote = 'rejected';
      })
      // =========== DownVote Async Thunk ====================
      .addCase(downVoteThreadAsync.pending, (state) => {
        state.statusVote = 'pending';
      })
      .addCase(downVoteThreadAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.statusVote = action.payload;
      })
      .addCase(downVoteThreadAsync.rejected, (state) => {
        state.statusVote = 'rejected';
      })
      // =========== Neutralize Vote Async Thunk ====================
      .addCase(neutralizeVoteThreadAsync.pending, (state) => {
        state.statusVote = 'pending';
      })
      .addCase(neutralizeVoteThreadAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.statusVote = action.payload;
      })
      .addCase(neutralizeVoteThreadAsync.rejected, (state) => {
        state.statusVote = 'rejected';
      });
  },
});

export const getAllThreadsStateAsync = createAsyncThunk('threads/getAllThreads', async () => {
  const response = await GET_ALL_THREADS();
  return response.data.threads;
});

// export const getDetailThreadStateAsync = createAsyncThunk('threads/getDetailThread', async () => {
//   const response = await GET_DETAIL_THREAD();
//   return response.data;
// });

export const upVoteThreadAsync = createAsyncThunk(
  'threads/upVoteThreadAsync',
  async (threadId: string) => {
    const response = await UP_VOTE_THREADS(threadId);
    return response.status;
  },
);

export const downVoteThreadAsync = createAsyncThunk(
  'threads/downVoteThreadAsync',
  async (threadId: string) => {
    const response = await DOWN_VOTE_THREADS(threadId);
    return response.data.status;
  },
);

export const neutralizeVoteThreadAsync = createAsyncThunk(
  'threads/neutralizeVoteThreadAsync',
  async (threadId: string) => {
    const response = await NEUTRALIZE_VOTE_THREADS(threadId);
    return response.data.status;
  },
);

// export const { setThreads } = threadsSlice.actions;

export default threadsSlice.reducer;
