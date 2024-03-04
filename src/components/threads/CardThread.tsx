import React from 'react';
import { postedAt } from '../../utils';
import { AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import useVotes from '../../hook/useVotes';
import UpVotes from '../votes/UpVotes';
import DownVotes from '../votes/DownVotes';
import useUser from '../../hook/useUser';

type CardThreadProps = {
  threadId: string;
  avatar?: string;
  name?: string;
  createdAt: string;
  category: string;
  title: string;
  body: string;
  totalComments: number;
  upVotesBy: string[];
  downVotesBy: string[];
};

const CardThread: React.FC<CardThreadProps> = ({
  threadId,
  avatar,
  name,
  createdAt,
  category,
  title,
  body,
  totalComments,
  upVotesBy,
  downVotesBy,
}) => {
  const { upVoteThread, downVoteThread, isUpVoteByAuthUser, isDownVoteByAuthUser } = useVotes();
  const { authUser } = useUser()
  const isThreadUpVote = isUpVoteByAuthUser(upVotesBy, authUser.id);
  const isThreadDownVote = isDownVoteByAuthUser(downVotesBy, authUser.id);

  const handleButtonUpVote = (event: React.MouseEvent) => {
    event.stopPropagation();
    upVoteThread(isThreadUpVote, threadId);
  };

  const handleButtonDownVote = (event: React.MouseEvent) => {
    event.stopPropagation();
    downVoteThread(isThreadDownVote, threadId);
  };

  return (
    <>
      <div>
        <div className='items-center gap-5 avatar'>
          <div className='rounded-full w-7 ring ring-primary ring-offset-base-100 ring-offset-2'>
            {avatar ? (
              <img src={avatar} alt={`/avatar/${name}`} />
            ) : (
              <div className='skeleton w-24 h-24 rounded-full shrink-0'></div>
            )}
          </div>
          <span>{name}</span>
          <span className=''>•</span>
          <span className='text-xs'>{postedAt(createdAt)}</span>
        </div>
        <Link to={`/threads/${name}/${threadId}`}>
          <div className='mb-2 font-semibold hover:underline'>{parser(title)}</div>
        </Link>
        <div className='font-thin line-clamp-5'>{parser(body)}</div>
        <div className='px-2 my-3 rounded-md cursor-pointer bg-base-300 w-fit hover:bg-base-200'>
          #{category}
        </div>
        <div className='flex items-center gap-3'>
          <UpVotes
            isAuthUserVotes={isThreadUpVote}
            totalVotes={upVotesBy.length}
            onVotes={handleButtonUpVote}
          />
          <DownVotes
            isAuthUserVotes={isThreadDownVote}
            totalVotes={downVotesBy.length}
            onVotes={handleButtonDownVote}
          />
          <Link to={`/threads/${name}/${threadId}`} className='flex items-center gap-2'>
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
