/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios.ts';

const threads = (() => {
  async function getAll() {
    try {
      const { data } = await instanceApi.get('/threads');
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  async function getDetail(threadId: string) {
    try {
      const { data } = await instanceApi.get(`/threads/${threadId}`);
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  async function upVote(threadId: string) {
    try {
      const { data } = await instanceApi.post(`/threads/${threadId}/up-vote`);
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  async function downVote(threadId: string) {
    try {
      const { data } = await instanceApi.post(`/threads/${threadId}/down-vote`);
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  async function neutralizeVote(threadId: string) {
    try {
      const { data } = await instanceApi.post(`/threads/${threadId}/neutral-vote`);
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  interface RequestThread {
    title: string;
    category: string;
    body: string;
  }

  async function create(createThread: RequestThread) {
    try {
      const { data } = await instanceApi.post('/threads', createThread);
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  return { getAll, getDetail, create, upVote, downVote, neutralizeVote };
})();

export default threads;
