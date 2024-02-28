import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../states/store';
import {
  downVoteThreadAsync,
  upVoteThreadAsync,
  neutralizeVoteThreadAsync,
  getAllThreadsStateAsync,
} from '../states/slice/threads-slice';
import {
  getDetailThreadAsync,
  neutralizeVoteCommentAsync,
  upVoteCommentAsync,
  downVoteCommentAsync,
} from '../states/slice/detail-thread-slice';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const useVotes = () => {
  const { statusVoteThread } = useSelector((state: RootState) => state.threads);
  const { statusVoteComment } = useSelector((state: RootState) => state.detailThread);
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonUpVoteThread = (isThreadUpVoteByAuthUser: boolean, threadId: string) => {
    if (isThreadUpVoteByAuthUser) {
      dispatch(neutralizeVoteThreadAsync(threadId));
    } else {
      dispatch(upVoteThreadAsync(threadId));
    }
    dispatch(getAllThreadsStateAsync());
    dispatch(getDetailThreadAsync(threadId));
  };

  const handleButtonDownVoteThread = (isThreadDownVoteByAuthUser: boolean, threadId: string) => {
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

  React.useEffect(() => {
    if (statusVoteThread === 'pending' || statusVoteComment === 'pending') {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [dispatch, statusVoteThread, statusVoteComment]);

  return {
    upVoteThread: handleButtonUpVoteThread,
    downVoteThread: handleButtonDownVoteThread,
    upVoteComment: handleButtonUpVoteComment,
    downVoteComment: handleButtonDownVoteComment,
  };
};

export default useVotes;
