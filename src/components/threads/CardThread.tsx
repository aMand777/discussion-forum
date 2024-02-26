import React from 'react';
import { postedAt } from '../../utils';
import {
  IoHeart,
  IoHeartDislikeOutline,
  IoHeartDislikeSharp,
  IoHeartOutline,
} from 'react-icons/io5';
import { AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../states/store';
import { downVoteThreadAsync, upVoteThreadAsync, neutralizeVoteThreadAsync, getAllThreadsStateAsync } from '../../states/slice/threads-slice';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

type CardThreadProps = {
  threadId: string;
  avatar?: string;
  name?: string;
  createdAt: string;
  // category: string
  title: string;
  body: string;
  totalComments: number;
  upVotesBy: string[];
  downVotesBy: string[];
  authUser: string;
};

const CardThread: React.FC<CardThreadProps> = ({
  threadId,
  avatar,
  name,
  createdAt,
  title,
  body,
  totalComments,
  authUser,
  upVotesBy,
  downVotesBy,
}) => {
  const totalUpVotes = upVotesBy.length;
  const totalDownVotes = downVotesBy.length;
  const isThreadUpVoteByAuthUser = upVotesBy.find((vote) => vote === authUser);
  const isThreadDownVoteByAuthUser = downVotesBy.find((vote) => vote === authUser);

  const dispatch = useDispatch<AppDispatch>()
  const { statusVote } = useSelector((state: RootState) => state.threads)

  const handleButtonUpVote = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (isThreadUpVoteByAuthUser) {
      dispatch(neutralizeVoteThreadAsync(threadId));
    } else {
      dispatch(upVoteThreadAsync(threadId))
    }
    dispatch(getAllThreadsStateAsync());
  }

  const handleButtonDownVote = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (isThreadDownVoteByAuthUser) {
      dispatch(neutralizeVoteThreadAsync(threadId));
    } else {
      dispatch(downVoteThreadAsync(threadId))
    }
    dispatch(getAllThreadsStateAsync());
  }

  React.useEffect(() => {
    if (statusVote === 'pending') {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  },[dispatch, statusVote])

  // console.log('statusVote===>', statusVote)

  return (
    <>
      <div>
        <div className='items-center gap-5 avatar'>
          <div className='rounded-full w-7 ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src={avatar} />
          </div>
          <span>{name}</span>
          <span className=''>•</span>
          <span className='text-xs'>{postedAt(createdAt)}</span>
        </div>
        <Link to={`/threads/${name}/${threadId}`}>
        <div className='mb-2 font-semibold hover:underline'>{parser(title)}</div>
        </Link>
        <div className='font-thin line-clamp-5'>{parser(body)}</div>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleButtonUpVote}
              className='p-0 rounded-full btn btn-ghost hover:bg-base-100'>
              {isThreadUpVoteByAuthUser ? (
                <IoHeart className='p-0 text-red-500 w-7 h-7' />
              ) : (
                <IoHeartOutline className='w-7 h-7' />
              )}
            </button>
            <span>{totalUpVotes}</span>
          </div>
          <div className='flex items-center gap-2'>
            <button onClick={handleButtonDownVote} className='p-0 rounded-full btn btn-ghost hover:bg-base-100'>
              {isThreadDownVoteByAuthUser ? (
                <IoHeartDislikeSharp className='text-red-500 w-7 h-7' />
              ) : (
                <IoHeartDislikeOutline className='w-7 h-7' />
              )}
            </button>
            <span>{totalDownVotes}</span>
          </div>
          <Link to='/threaads/detail' className='flex items-center gap-2'>
            <AiOutlineComment className='w-7 h-7' />
            <span>{totalComments}</span>
          </Link>
        </div>
        <div className='divider'></div>
      </div>
    </>
  );
};

export default CardThread;
