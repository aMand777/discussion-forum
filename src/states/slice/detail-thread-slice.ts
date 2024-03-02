import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_DETAIL_THREAD } from '../../services/threads.services';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setToast, unSetToast } from '../../states/slice/toast-slice';

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
  async (threadId: string, { dispatch }) => {
    dispatch(unSetToast())
    dispatch(showLoading())
    try {
      const response = await GET_DETAIL_THREAD(threadId);
      if (response.status === 'success') {
        dispatch(setDetailThread(response.data.detailThread))
        dispatch(hideLoading());
      }
      return response.status
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading())
    }
  },
);

const detailThreadSlice = createSlice({
  name: 'detailThreads',
  initialState,
  reducers: {
    setDetailThread: (state, action: PayloadAction<DetailThread>) => {
      state.value = action.payload;
    }
  },
});


export const { setDetailThread } = detailThreadSlice.actions

export default detailThreadSlice.reducer;
