import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_DETAIL_THREAD } from '../../services/threads.services';

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
  value: DetailThread | null;
}

const initialState: DetailThreadState = {
  value: null,
};

export const getDetailThreadAsync = createAsyncThunk(
  'detailThreads/getDetailThread',
  async (threadId: string | undefined) => {
    const response = await GET_DETAIL_THREAD(threadId);
    return response.data.detailThread;
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
        (state, action: PayloadAction<DetailThread | null>) => {
          state.value = action.payload;
        },
      )
      .addCase(getDetailThreadAsync.rejected, () => {
        // Handle rejected state if needed
      });
  },
});

export default detailThreadSlice.reducer;
