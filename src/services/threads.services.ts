/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios';

export const GET_ALL_THREADS = async () => {
  try {
    const { data } = await instanceApi.get('/threads');
    return data;
  } catch (error: any) {
    throw error.response
  }
};

export const GET_DETAIL_THREAD = async (threadId: string) => {
  try {
    const { data } = await instanceApi.get(`/threads/${threadId}`);
    return data;
  } catch (error: any) {
    throw error.response
  }
};

export const UP_VOTE_THREADS = async (threadId: string) => {
  try {
    const { data } = await instanceApi.post(`/threads/${threadId}/up-vote`);
    return data;
  } catch (error: any) {
    throw error.response
  }
};

export const DOWN_VOTE_THREADS = async (threadId: string) => {
  try {
    const { data } = await instanceApi.post(`/threads/${threadId}/down-vote`);
    return data;
  } catch (error: any) {
    throw error.response
  }
};

export const NEUTRALIZE_VOTE_THREADS = async (threadId: string) => {
  try {
    const { data } = await instanceApi.post(`/threads/${threadId}/neutral-vote`);
    return data;
  } catch (error: any) {
    throw error.response
  }
};

export const UP_VOTE_COMMENT = async (threadId: string, commentId: string) => {
  try {
    const { data } = await instanceApi.post(`/threads/${threadId}/comments/${commentId}/up-vote`);
    return data;
  } catch (error: any) {
    throw error.response
  }
};

export const DOWN_VOTE_COMMENT = async (threadId: string, commentId: string) => {
  try {
    const { data } = await instanceApi.post(`/threads/${threadId}/comments/${commentId}/down-vote`);
    return data;
  } catch (error: any) {
    throw error.response
  }
};

export const NEUTRALIZE_VOTE_COMMENT = async (threadId: string, commentId: string) => {
  try {
    const { data } = await instanceApi.post(
      `threads/${threadId}/comments/${commentId}/neutral-vote`,
    );
    return data;
  } catch (error: any) {
    throw error.response
  }
};

interface RequestThread {
  title: string;
  category: string;
  body: string;
}

export const POST_THREAD = async (createThread: RequestThread) => {
  try {
    const { data } = await instanceApi.post('/threads', createThread);
    return data;
  } catch (error: any) {
    throw error.response
  }
};

interface RequestComment {
  content: string;
  threadId: string;
}

export const POST_COMMENT = async (createComment: RequestComment) => {
  const { content, threadId } = createComment
  try {
    const { data } = await instanceApi.post(`/threads/${threadId}/comments`, {content});
    return data;
  } catch (error: any) {
    throw error.response
  }
};
