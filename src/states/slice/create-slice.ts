import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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
  message: string;
}

const initialState: Create = {
  status: '',
  message: '',
};

export const postNewThreadAsync = createAsyncThunk(
  'threads/postNewThread',
  async (createThread: RequestThread, { dispatch }) => {
    dispatch(setToast({ isOpen: false, status: '', message: '' }));
    try {
      const response = await POST_THREAD(createThread);
      if (response.status === 'success') {
        dispatch(setToast({ isOpen: true, status: 'info', message: response.message }));
        dispatch(getAllThreadsStateAsync());
      }
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setToast({ isOpen: true, status: 'error', message: error.data.message }));
      return error.data;
    }
  },
);

export const postNewCommentAsync = createAsyncThunk(
  'threads/postNewComment',
  async (createComment: RequestComment, { dispatch }) => {
    dispatch(setToast({ isOpen: false, status: '', message: '' }));
    const { threadId } = createComment
    try {
      const response = await POST_COMMENT(createComment);
      if (response.status === 'success') {
        dispatch(setToast({ isOpen: true, status: 'info', message: response.message }));
        dispatch(getDetailThreadAsync(threadId));
      }
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setToast({ isOpen: true, status: 'error', message: error.data.message }));
      return error.data;
    }
  },
);

const createCommentSlice = createSlice({
  name: 'create',
  initialState,
  reducers: {
    setResponse(state, action: PayloadAction<Create>) {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    unSetResponse(state) {
      state.status = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewThreadAsync.fulfilled, (state, action: PayloadAction<Create>) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(postNewCommentAsync.fulfilled, (state, action: PayloadAction<Create>) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
      });
  },
});

export const { unSetResponse } = createCommentSlice.actions

export default createCommentSlice.reducer;
