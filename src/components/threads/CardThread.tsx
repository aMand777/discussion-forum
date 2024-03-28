import React from 'react';
import parser from 'html-react-parser';
import { AiOutlineComment } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { postedAt } from '../../utils/index.ts';
import useUser from '../../hook/useUser.ts';
import useVotes from '../../hook/useVotes.ts';
import UpVotesThread from '../votes/UpVotesThread.tsx';
import DownVotesThread from '../votes/DownVotesThread.tsx';

type CardThreadProps = {
  threadId: string;
  userId: string;
  avatar: string;
  name: string;
  createdAt: string;
  category: string;
  title: string;
  body: string;
  totalComments: number;
  upVotesBy: string[];
  downVotesBy: string[];
};

function CardThread({
  threadId,
  userId,
  avatar,
  name,
  createdAt,
  category,
  title,
  body,
  totalComments,
  upVotesBy,
  downVotesBy,
}: CardThreadProps) {
  const { upVoteThread, downVoteThread, isUpVoteByAuthUser, isDownVoteByAuthUser } = useVotes();
  const { authUser } = useUser();
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
    <div className="mb-12 lg:mb-1">
      <div className="items-center gap-5 avatar">
        <div className="rounded-full w-7 ring ring-primary ring-offset-base-100 ring-offset-2">
          {avatar ? (
            <img src={avatar} alt={`/avatar/${name}`} />
          ) : (
            <div className="w-24 h-24 rounded-full skeleton shrink-0" />
          )}
        </div>
        <Link to={`/${name}/${userId}/profile`}>{name}</Link>
        <span>•</span>
        <span className="text-xs">{postedAt(createdAt)}</span>
      </div>
      <Link to={`/threads/${name}/${threadId}`}>
        <div className="mb-2 font-semibold hover:underline">{parser(title)}</div>
      </Link>
      <div className="font-thin line-clamp-5">{parser(body)}</div>
      <Link
        to={`/threads/categories/${category}`}
        className="flex items-center gap-1 px-2 my-3 rounded-md cursor-pointer bg-base-300 w-fit hover:bg-base-200"
      >
        <FaTag className="text-accent" />
        {category}
      </Link>
      <div className="flex items-center gap-3">
        <UpVotesThread
          threadId={threadId}
          isAuthUserVotes={isThreadUpVote}
          totalVotes={upVotesBy.length}
          onVotes={handleButtonUpVote}
        />
        <DownVotesThread
          threadId={threadId}
          isAuthUserVotes={isThreadDownVote}
          totalVotes={downVotesBy.length}
          onVotes={handleButtonDownVote}
        />
        <Link to={`/threads/${name}/${threadId}`} className="flex items-center gap-2">
          <AiOutlineComment className="w-7 h-7" />
          <span>{totalComments}</span>
        </Link>
      </div>
      <div className="divider" />
    </div>
  );
}

export default CardThread;
