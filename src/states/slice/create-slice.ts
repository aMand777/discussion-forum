import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { POST_THREAD, POST_COMMENT } from '../../services/threads.services';
import { setToast } from './toast-slice';
import { getAllThreadsStateAsync } from './threads-slice';
import { getDetailThreadAsync } from './detail-thread-slice';

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

export const postNewThreadAsync = createAsyncThunk(
  'create/postNewThread',
  async (createThread: RequestThread, { dispatch }) => {
    dispatch(setResponse('loading'));
    dispatch(setToast({ isOpen: false, status: '', message: '' }));
    try {
      const response = await POST_THREAD(createThread);
      if (response.status === 'success') {
        dispatch(getAllThreadsStateAsync());
        dispatch(setResponse('success'));
        dispatch(setToast({ isOpen: true, status: 'info', message: response.message }));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(unSetResponse());
      dispatch(setToast({ isOpen: true, status: 'error', message: error.data.message }));
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
      const response = await POST_COMMENT(createComment);
      if (response.status === 'success') {
        dispatch(getDetailThreadAsync(threadId));
        dispatch(setResponse('success'));
        dispatch(setToast({ isOpen: true, status: 'info', message: response.message }));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(unSetResponse());
      dispatch(setToast({ isOpen: true, status: 'error', message: error.data.message }));
      return error.data;
    }
  },
);

const createCommentSlice = createSlice({
  name: 'create',
  initialState,
  reducers: {
    setResponse(state, action) {
      state.status = action.payload;
    },
    unSetResponse(state) {
      state.status = '';
    },
  },
});

export const { setResponse, unSetResponse } = createCommentSlice.actions;

export default createCommentSlice.reducer;
