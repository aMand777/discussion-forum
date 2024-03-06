import React from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type UpVotesThreadProps = {
  threadId: string;
  isAuthUserVotes: boolean;
  totalVotes: number | undefined;
  onVotes: (event: React.MouseEvent) => void;
};

const UpVotesThread: React.FC<UpVotesThreadProps> = ({ threadId, isAuthUserVotes, totalVotes, onVotes }) => {

  return (
    <>
      <div className='flex items-center gap-2'>
        <button onClick={onVotes} className='p-0 rounded-full btn btn-ghost hover:bg-base-100'>
          {isAuthUserVotes ? (
            <IoHeart className='p-0 text-error w-7 h-7' />
          ) : (
            <IoHeartOutline className='w-7 h-7' />
          )}
        </button>
        {totalVotes && totalVotes > 0 ? (
          <Link to={`/${threadId}/upvotes_by`}>{totalVotes}</Link>
        ) : (
          <span>{totalVotes}</span>
        )}
      </div>
    </>
  );
};

export default UpVotesThread;
