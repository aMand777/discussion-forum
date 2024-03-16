import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import threads from '../../services/threads.services.ts';
import comment from '../../services/comment.services.ts';
import { setToast } from './toast-slice.ts';
import { getAllThreadsStateAsync } from './threads-slice.ts';
import { getDetailThreadAsync } from './detail-thread-slice.ts';

interface RequestThread {
  title: string;
  category: string;
  body: string;
}

interface RequestComment {
  content: string;
  threadId: string;
}

interface Create {
  status: string;
}

const initialState: Create = {
  status: '',
};

const createCommentSlice = createSlice({
  name: 'create',
  initialState,
  reducers: {
    setResponse(state, action) {
      return { ...state, status: action.payload };
    },
    unSetResponse(state) {
      return { ...state, status: '' };
    },
  },
});

export const { setResponse, unSetResponse } = createCommentSlice.actions;

export const postNewThreadAsync = createAsyncThunk(
  'create/postNewThread',
  async (createThread: RequestThread, { dispatch }) => {
    dispatch(setResponse('loading'));
    dispatch(setToast({ isOpen: false, status: '', message: '' }));
    try {
      const response = await threads.create(createThread);
      if (response.status === 'success') {
        dispatch(getAllThreadsStateAsync());
        dispatch(setResponse('success'));
        dispatch(
          setToast({ isOpen: true, status: 'info', message: response.message }),
        );
      }
      return response.status;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(unSetResponse());
      dispatch(
        setToast({
          isOpen: true,
          status: 'error',
          message: error.data.message,
        }),
      );
      return error.data;
    }
  },
);

export const postNewCommentAsync = createAsyncThunk(
  'create/postNewComment',
  async (createComment: RequestComment, { dispatch }) => {
    dispatch(setResponse('loading'));
    dispatch(setToast({ isOpen: false, status: '', message: '' }));
    const { threadId } = createComment;
    try {
      const response = await comment.create(createComment);
      if (response.status === 'success') {
        dispatch(getDetailThreadAsync(threadId));
        dispatch(setResponse('success'));
        dispatch(
          setToast({ isOpen: true, status: 'info', message: response.message }),
        );
      }
      return response.status;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(unSetResponse());
      dispatch(
        setToast({
          isOpen: true,
          status: 'error',
          message: error.data.message,
        }),
      );
      return error.data;
    }
  },
);

export default createCommentSlice.reducer;
