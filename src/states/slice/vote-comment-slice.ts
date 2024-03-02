/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  DOWN_VOTE_COMMENT,
  NEUTRALIZE_VOTE_COMMENT,
  UP_VOTE_COMMENT,
} from '../../services/threads.services';
import { getDetailThreadAsync } from '../../states/slice/detail-thread-slice';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setToast, unSetToast } from '../../states/slice/toast-slice'

interface VoteCommentParams {
  threadId: string;
  commentId: string;
}

export const upVoteCommentAsync = createAsyncThunk(
  'comments/upVoteCommentAsync',
  async ({ threadId, commentId }: VoteCommentParams, { dispatch }) => {
    dispatch(unSetToast())
    dispatch(showLoading());
    try {
      const response = await UP_VOTE_COMMENT(threadId, commentId);
      if (response.status === 'success') {
        dispatch(getDetailThreadAsync(threadId));
        dispatch(hideLoading());
      }
      return response.status;
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
    }
  },
);

export const downVoteCommentAsync = createAsyncThunk(
  'comments/downVoteCommentAsync',
  async ({ threadId, commentId }: VoteCommentParams, { dispatch }) => {
    dispatch(unSetToast())
    dispatch(showLoading());
    try {
      const response = await DOWN_VOTE_COMMENT(threadId, commentId);
      if (response.status === 'success') {
        dispatch(getDetailThreadAsync(threadId));
        dispatch(hideLoading());
      }
      return response.status;
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
    }
  },
);

export const neutralizeVoteCommentAsync = createAsyncThunk(
  'comments/neutralizeVoteCommentAsync',
  async ({ threadId, commentId }: VoteCommentParams, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await NEUTRALIZE_VOTE_COMMENT(threadId, commentId);
      if (response.status === 'success') {
        dispatch(getDetailThreadAsync(threadId));
        dispatch(hideLoading());
      }
      return response.status;
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
    }
  },
);

const voteCommentSlice = createSlice({
  name: 'voteComment',
  initialState: {},
  reducers: {},
})

export default voteCommentSlice.reducer