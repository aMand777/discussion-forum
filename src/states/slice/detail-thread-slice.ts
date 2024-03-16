import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import threads from '../../services/threads.services.ts';
import { setToast, unSetToast } from './toast-slice.ts';

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
  status: string;
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
  status: '',
};

const detailThreadSlice = createSlice({
  name: 'detailThreads',
  initialState,
  reducers: {
    setDetailThread(state, action: PayloadAction<DetailThread>) {
      return { ...state, status: 'success', value: action.payload };
    },
    setStatus(state, action) {
      return { ...state, status: action.payload };
    },
  },
});

export const { setDetailThread, setStatus } = detailThreadSlice.actions;

export const getDetailThreadAsync = createAsyncThunk(
  'detailThreads/getDetailThread',
  async (threadId: string, { dispatch }) => {
    dispatch(setStatus('loading'));
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await threads.getDetail(threadId);
      if (response.status === 'success') {
        dispatch(setDetailThread(response.data.detailThread));
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

export default detailThreadSlice.reducer;
