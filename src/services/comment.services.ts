/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios.ts';

const comment = (() => {
  interface RequestComment {
    content: string;
    threadId: string;
  }

  async function create(createComment: RequestComment) {
    const { content, threadId } = createComment;
    try {
      const { data } = await instanceApi.post(`/threads/${threadId}/comments`, {
        content,
      });
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  async function upVote(threadId: string, commentId: string) {
    try {
      const { data } = await instanceApi.post(`/threads/${threadId}/comments/${commentId}/up-vote`);
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  async function downVote(threadId: string, commentId: string) {
    try {
      const { data } = await instanceApi.post(
        `/threads/${threadId}/comments/${commentId}/down-vote`,
      );
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  async function neutralizeVote(threadId: string, commentId: string) {
    try {
      const { data } = await instanceApi.post(
        `threads/${threadId}/comments/${commentId}/neutral-vote`,
      );
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  return { create, upVote, downVote, neutralizeVote };
})();

export default comment;
