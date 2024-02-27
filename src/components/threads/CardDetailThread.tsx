import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { postedAt } from '../../utils';
import parse from 'html-react-parser';
import UpVotes from '../votes/UpVotes';
import DownVotes from '../votes/DownVotes';
import useVotes from '../../hook/useVotes';

interface Owner {
  id: string;
  name: string;
  avatar: string;
}

interface CommentThread {
  id: string;
  content: string;
  createdAt: string;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
}

type CardDetailThreadProps = {
  threadId: string | undefined;
  authUser: string | undefined;
  owner: string | undefined;
  avatar: string | undefined;
  title: string | undefined;
  body: string | undefined;
  createdAt: string | undefined;
  comments: CommentThread[] | undefined;
  upVotesBy: string[] | undefined;
  downVotesBy: string[] | undefined;
};

const CardDetailThread: React.FC<CardDetailThreadProps> = ({
  threadId,
  authUser,
  owner,
  avatar,
  title,
  body,
  createdAt,
  comments,
  upVotesBy,
  downVotesBy,
}) => {
  const { upVoteThread, downVoteThread } = useVotes();
  
  const isThreadUpVoteByAuthUser = upVotesBy
    ? upVotesBy.filter((vote) => vote === authUser).length > 0
    : false;
  const isThreadDownVoteByAuthUser = downVotesBy
    ? downVotesBy.filter((vote) => vote === authUser).length > 0
    : false;

  const handleButtonUpVote = (event: React.MouseEvent) => {
    event.stopPropagation();
    upVoteThread(isThreadUpVoteByAuthUser, threadId || '');
  };

  const handleButtonDownVote = (event: React.MouseEvent) => {
    event.stopPropagation();
    downVoteThread(isThreadDownVoteByAuthUser, threadId || '');
  };

  return (
    <>
      <div className='p-10'>
        <div className='items-center gap-5 avatar'>
          <div className='w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src={avatar || ''} />
          </div>
          <span>{owner}</span>
          <span className=''>•</span>
          <span className='text-xs'>{postedAt(createdAt || '')}</span>
        </div>
        <div className='my-2 font-semibold'>{parse(title || '')}</div>
        <div className='font-thin'>{parse(body || '')}</div>
        <div className='flex items-center gap-3'>
          <UpVotes
            isAuthUserVotes={isThreadUpVoteByAuthUser}
            totalVotes={upVotesBy?.length}
            onVotes={handleButtonUpVote}
          />
          <DownVotes
            isAuthUserVotes={isThreadDownVoteByAuthUser}
            totalVotes={downVotesBy?.length}
            onVotes={handleButtonDownVote}
          />
          <AiOutlineComment className='w-7 h-7' />
          <span>{comments?.length}</span>
        </div>
        <div className='divider'></div>
      </div>
    </>
  );
};

export default CardDetailThread;
