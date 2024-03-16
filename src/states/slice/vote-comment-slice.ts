/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import comment from '../../services/comment.services.ts';
import { getDetailThreadAsync } from './detail-thread-slice.ts';
import { setToast, unSetToast } from './toast-slice.ts';

interface VoteCommentParams {
  threadId: string;
  commentId: string;
}

const voteCommentSlice = createSlice({
  name: 'voteComment',
  initialState: {},
  reducers: {},
});

export const upVoteCommentAsync = createAsyncThunk(
  'comments/upVoteCommentAsync',
  async ({ threadId, commentId }: VoteCommentParams, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await comment.upVote(threadId, commentId);
      if (response.status === 'success') {
        dispatch(getDetailThreadAsync(threadId));
        dispatch(hideLoading());
      }
      return response.status;
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
      return error.data.message;
    }
  },
);

export const downVoteCommentAsync = createAsyncThunk(
  'comments/downVoteCommentAsync',
  async ({ threadId, commentId }: VoteCommentParams, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await comment.downVote(threadId, commentId);
      if (response.status === 'success') {
        dispatch(getDetailThreadAsync(threadId));
        dispatch(hideLoading());
      }
      return response.status;
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
      return error.data.message;
    }
  },
);

export const neutralizeVoteCommentAsync = createAsyncThunk(
  'comments/neutralizeVoteCommentAsync',
  async ({ threadId, commentId }: VoteCommentParams, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await comment.neutralizeVote(threadId, commentId);
      if (response.status === 'success') {
        dispatch(getDetailThreadAsync(threadId));
        dispatch(hideLoading());
      }
      return response.status;
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
      return error.data.message;
    }
  },
);

export default voteCommentSlice.reducer;
