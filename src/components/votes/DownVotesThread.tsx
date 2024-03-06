import React from 'react';
import { IoHeartDislikeOutline, IoHeartDislikeSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type DownVotesThreadProps = {
  threadId: string
  isAuthUserVotes: boolean;
  totalVotes: number | undefined;
  onVotes: (event: React.MouseEvent) => void;
};

const DownVotesThread: React.FC<DownVotesThreadProps> = ({threadId, isAuthUserVotes, totalVotes, onVotes }) => {
  return (
    <>
      <div className='flex items-center gap-2'>
        <button onClick={onVotes} className='p-0 rounded-full btn btn-ghost hover:bg-base-100'>
          {isAuthUserVotes ? (
            <IoHeartDislikeSharp className='text-error w-7 h-7' />
          ) : (
            <IoHeartDislikeOutline className='w-7 h-7' />
          )}
        </button>
        {totalVotes && totalVotes > 0 ? (
          <Link to={`/${threadId}/downvotes_by`}>{totalVotes}</Link>
        ) : (
          <span>{totalVotes}</span>
        )}
      </div>
    </>
  );
};

export default DownVotesThread;
