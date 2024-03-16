/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import threads from '../../services/threads.services.ts';
import { getAllThreadsStateAsync } from './threads-slice.ts';
import { setToast, unSetToast } from './toast-slice.ts';

const voteThreadSlice = createSlice({
  name: 'voteThread',
  initialState: {},
  reducers: {},
});

export const upVoteThreadAsync = createAsyncThunk(
  'threads/upVoteThreadAsync',
  async (threadId: string, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      // const response = await UP_VOTE_THREADS(threadId);
      const response = await threads.upVote(threadId);
      if (response.status === 'success') {
        dispatch(getAllThreadsStateAsync());
        dispatch(hideLoading());
      }
      return response.status;
    } catch (error: any) {
      dispatch(hideLoading());
      dispatch(setToast({ status: 'error', message: error.data.message }));
      return error.data.message;
    }
  },
);

export const downVoteThreadAsync = createAsyncThunk(
  'threads/downVoteThreadAsync',
  async (threadId: string, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await threads.downVote(threadId);
      if (response.status === 'success') {
        dispatch(getAllThreadsStateAsync());
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

export const neutralizeVoteThreadAsync = createAsyncThunk(
  'threads/neutralizeVoteThreadAsync',
  async (threadId: string, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await threads.neutralizeVote(threadId);
      if (response.status === 'success') {
        dispatch(getAllThreadsStateAsync());
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

export default voteThreadSlice.reducer;
