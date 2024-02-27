import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../states/store';
import {
  downVoteThreadAsync,
  upVoteThreadAsync,
  neutralizeVoteThreadAsync,
  getAllThreadsStateAsync,
} from '../states/slice/threads-slice';
import { getDetailThreadAsync } from '../states/slice/detail-thread-slice'
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const useVotes = () => {
  const { statusVote } = useSelector((state: RootState) => state.threads);
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

    React.useEffect(() => {
      if (statusVote === 'pending') {
        dispatch(showLoading());
      } else {
        dispatch(hideLoading());
      }
    }, [dispatch, statusVote]);

  return { upVoteThread: handleButtonUpVoteThread, downVoteThread: handleButtonDownVoteThread };
};

export default useVotes;
