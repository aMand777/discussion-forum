/* eslint-disable arrow-body-style */
import { useAppDispatch } from '../states/store.ts';
import { getAllThreadsStateAsync } from '../states/slice/threads-slice.ts';
import { getDetailThreadAsync } from '../states/slice/detail-thread-slice.ts';
import {
  downVoteThreadAsync,
  upVoteThreadAsync,
  neutralizeVoteThreadAsync,
} from '../states/slice/vote-thread-slice.ts';
import {
  neutralizeVoteCommentAsync,
  upVoteCommentAsync,
  downVoteCommentAsync,
} from '../states/slice/vote-comment-slice.ts';

const useVotes = () => {
  const dispatch = useAppDispatch();

  const handleButtonUpVoteThread = (
    isThreadUpVoteByAuthUser: boolean,
    threadId: string,
  ) => {
    if (isThreadUpVoteByAuthUser) {
      dispatch(neutralizeVoteThreadAsync(threadId));
    } else {
      dispatch(upVoteThreadAsync(threadId));
    }
    dispatch(getAllThreadsStateAsync());
    dispatch(getDetailThreadAsync(threadId));
  };

  const handleButtonDownVoteThread = (
    isThreadDownVoteByAuthUser: boolean,
    threadId: string,
  ) => {
    if (isThreadDownVoteByAuthUser) {
      dispatch(neutralizeVoteThreadAsync(threadId));
    } else {
      dispatch(downVoteThreadAsync(threadId));
    }
    dispatch(getAllThreadsStateAsync());
    dispatch(getDetailThreadAsync(threadId));
  };

  const handleButtonUpVoteComment = (
    isCommentUpVoteByAuthUser: boolean,
    threadId: string,
    commentId: string,
  ) => {
    if (isCommentUpVoteByAuthUser) {
      dispatch(neutralizeVoteCommentAsync({ threadId, commentId }));
    } else {
      dispatch(upVoteCommentAsync({ threadId, commentId }));
    }
    dispatch(getAllThreadsStateAsync());
    dispatch(getDetailThreadAsync(threadId));
  };

  const handleButtonDownVoteComment = (
    isCommentDownVoteByAuthUser: boolean,
    threadId: string,
    commentId: string,
  ) => {
    if (isCommentDownVoteByAuthUser) {
      dispatch(neutralizeVoteCommentAsync({ threadId, commentId }));
    } else {
      dispatch(downVoteCommentAsync({ threadId, commentId }));
    }
    dispatch(getAllThreadsStateAsync());
    dispatch(getDetailThreadAsync(threadId));
  };

  const isUpVoteByAuthUser = (upVotesBy: string[], authUserId: string) => {
    return upVotesBy.filter((vote: string) => vote === authUserId).length > 0;
  };

  const isDownVoteByAuthUser = (upVotesBy: string[], authUserId: string) => {
    return upVotesBy.filter((vote: string) => vote === authUserId).length > 0;
  };

  return {
    upVoteThread: handleButtonUpVoteThread,
    downVoteThread: handleButtonDownVoteThread,
    upVoteComment: handleButtonUpVoteComment,
    downVoteComment: handleButtonDownVoteComment,
    isUpVoteByAuthUser,
    isDownVoteByAuthUser,
  };
};

export default useVotes;
