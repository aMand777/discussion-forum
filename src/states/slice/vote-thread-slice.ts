/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  DOWN_VOTE_THREADS,
  NEUTRALIZE_VOTE_THREADS,
  UP_VOTE_THREADS,
} from '../../services/threads.services';
import { getAllThreadsStateAsync } from '../../states/slice/threads-slice';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setToast, unSetToast } from '../../states/slice/toast-slice';

export const upVoteThreadAsync = createAsyncThunk(
  'threads/upVoteThreadAsync',
  async (threadId: string, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await UP_VOTE_THREADS(threadId);
      if (response.status === 'success') {
        dispatch(getAllThreadsStateAsync());
        dispatch(hideLoading());
      }
      return response.status;
    } catch (error: any) {
      dispatch(hideLoading());
      dispatch(setToast({ status: 'error', message: error.data.message }));
    }
  },
);

export const downVoteThreadAsync = createAsyncThunk(
  'threads/downVoteThreadAsync',
  async (threadId: string, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await DOWN_VOTE_THREADS(threadId);
      if (response.status === 'success') {
        dispatch(getAllThreadsStateAsync());
        dispatch(hideLoading());
      }
      return response.status;
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
    }
  },
);

export const neutralizeVoteThreadAsync = createAsyncThunk(
  'threads/neutralizeVoteThreadAsync',
  async (threadId: string, { dispatch }) => {
    dispatch(unSetToast());
    dispatch(showLoading());
    try {
      const response = await NEUTRALIZE_VOTE_THREADS(threadId);
      if (response.status === 'success') {
        dispatch(getAllThreadsStateAsync());
        dispatch(hideLoading());
      }
      return response.status;
    } catch (error: any) {
      dispatch(setToast({ status: 'error', message: error.data.message }));
      dispatch(hideLoading());
    }
  },
);

const voteThreadSlice = createSlice({
  name: 'voteThread',
  initialState: {},
  reducers: {},
});

export default voteThreadSlice.reducer;
