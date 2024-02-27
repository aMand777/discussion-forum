/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios'

export const GET_ALL_THREADS = async () => {
  try {
    const { data } = await instanceApi.get('/threads')
    return data
  } catch (error: any) {
    throw error.response?.data.message
  }
}

export const GET_DETAIL_THREAD = async (threadId: string | undefined) => {
  try {
    const { data } = await instanceApi.get(`/threads/${threadId}`)
    return data
  } catch (error: any) {
    throw error.response?.data.message
  }
}

export const UP_VOTE_THREADS = async (threadId: string) => {
  try {
    const { data } = await instanceApi.post(`/threads/${threadId}/up-vote`);
    return data;
  } catch (error: any) {
    throw error.response?.data.message;
  }
};

export const DOWN_VOTE_THREADS = async (threadId: string) => {
  try {
    const { data } = await instanceApi.post(`/threads/${threadId}/down-vote`);
    return data;
  } catch (error: any) {
    throw error.response?.data.message;
  }
};

export const NEUTRALIZE_VOTE_THREADS = async (threadId: string) => {
  try {
    const { data } = await instanceApi.post(`/threads/${threadId}/neutral-vote`);
    return data;
  } catch (error: any) {
    throw error.response?.data.message;
  }
};