import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  DOWN_VOTE_COMMENT,
  GET_DETAIL_THREAD,
  NEUTRALIZE_VOTE_COMMENT,
  UP_VOTE_COMMENT,
} from '../../services/threads.services';

interface VoteCommentParams {
  threadId: string;
  commentId: string;
}

interface Owner {
  id: string;
  name: string;
  avatar: string;
}

interface CommentThread {
  id: string;
  content: string;
  createdAt: string;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
}

interface DetailThread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
  comments: CommentThread[];
}

interface DetailThreadState {
  value: DetailThread;
  statusVoteComment: string;
}

const initialState: DetailThreadState = {
  value: {
    id: '',
    title: '',
    body: '',
    category: '',
    createdAt: '',
    owner: {
      id: '',
      name: '',
      avatar: '',
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: '',
        content: '',
        createdAt: '',
        owner: {
          id: '',
          name: '',
          avatar: '',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  },
  statusVoteComment: '',
};

export const getDetailThreadAsync = createAsyncThunk(
  'detailThreads/getDetailThread',
  async (threadId: string | undefined) => {
    const response = await GET_DETAIL_THREAD(threadId);
    return response.data.detailThread;
  },
);

export const upVoteCommentAsync = createAsyncThunk(
  'comments/upVoteCommentAsync',
  async ({ threadId, commentId }: VoteCommentParams) => {
    const response = await UP_VOTE_COMMENT(threadId, commentId);
    return response.status;
  },
);

export const downVoteCommentAsync = createAsyncThunk(
  'comments/downVoteCommentAsync',
  async ({ threadId, commentId }: VoteCommentParams) => {
    const response = await DOWN_VOTE_COMMENT(threadId, commentId);
    return response.data.status;
  },
);

export const neutralizeVoteCommentAsync = createAsyncThunk(
  'comments/neutralizeVoteCommentAsync',
  async ({ threadId, commentId }: VoteCommentParams) => {
    const response = await NEUTRALIZE_VOTE_COMMENT(threadId, commentId);
    return response.data.status;
  },
);

const detailThreadSlice = createSlice({
  name: 'detailThreads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailThreadAsync.pending, () => {
        // Handle pending state if needed
      })
      .addCase(
        getDetailThreadAsync.fulfilled,
        (state, action: PayloadAction<DetailThread>) => {
          state.value = action.payload;
        },
      )
      .addCase(getDetailThreadAsync.rejected, () => {
        // Handle rejected state if needed
      })
      // =========== UpVote Async Thunk ====================
      .addCase(upVoteCommentAsync.pending, (state) => {
        state.statusVoteComment = 'pending';
      })
      .addCase(upVoteCommentAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.statusVoteComment = action.payload;
      })
      .addCase(upVoteCommentAsync.rejected, (state) => {
        state.statusVoteComment = 'rejected';
      })
      // =========== DownVote Async Thunk ====================
      .addCase(downVoteCommentAsync.pending, (state) => {
        state.statusVoteComment = 'pending';
      })
      .addCase(downVoteCommentAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.statusVoteComment = action.payload;
      })
      .addCase(downVoteCommentAsync.rejected, (state) => {
        state.statusVoteComment = 'rejected';
      })
      // =========== Neutralize Vote Async Thunk ====================
      .addCase(neutralizeVoteCommentAsync.pending, (state) => {
        state.statusVoteComment = 'pending';
      })
      .addCase(neutralizeVoteCommentAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.statusVoteComment = action.payload;
      })
      .addCase(neutralizeVoteCommentAsync.rejected, (state) => {
        state.statusVoteComment = 'rejected';
      });
  },
});

export default detailThreadSlice.reducer;
