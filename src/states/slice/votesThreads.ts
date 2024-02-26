import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_ALL_THREADS, UP_VOTE_THREADS } from '../../services/threads.services';

interface UpVote {
  id: string;
  userId: string;
  threadId: string;
  voteType: number;
}

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
  upVote: UpVote;
}

const initialState: ThreadsState = {
  value: [],
  upVote: {
    id: '',
    userId: '',
    threadId: '',
    voteType: 0,
  },
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads(state, action: PayloadAction<Thread[]>) {
      state.value = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllThreadsStateAsync.pending, (state) => {
        console.log('Loading..');
        state.value = [];
      })
      .addCase(getAllThreadsStateAsync.fulfilled, (state, action: PayloadAction<Thread[]>) => {
        state.value = action.payload;
      })
      .addCase(getAllThreadsStateAsync.rejected, () => {
        console.log('Failed..');
      })
      // =========== UpVote Async Thunk ====================
      .addCase(upVoteThreadAsync.pending, (state) => {
        console.log('Loading..');
        state.upVote = initialState.upVote;
      })
      .addCase(upVoteThreadAsync.fulfilled, (state, action: PayloadAction<UpVote>) => {
        state.upVote = action.payload;
      })
      .addCase(upVoteThreadAsync.rejected, (state) => {
        console.log('Failed..');
        state.upVote = initialState.upVote;
      });
  },
});

export const getAllThreadsStateAsync = createAsyncThunk('threads/getAllThreads', async () => {
  const response = await GET_ALL_THREADS();
  return response.data.threads;
});

export const upVoteThreadAsync = createAsyncThunk(
  'threads/upVoteThreadAsync',
  async (threadId: string) => {
    const response = await UP_VOTE_THREADS(threadId);
    // console.log('responseUpVote===>', response)
    return response.data.vote;
    // throw response
  },
);

export const { setThreads } = threadsSlice.actions;

export default threadsSlice.reducer;
