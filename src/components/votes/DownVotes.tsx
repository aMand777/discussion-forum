import React from 'react';
import { IoHeartDislikeOutline, IoHeartDislikeSharp } from 'react-icons/io5';

type DownVotesProps = {
  isAuthUserVotes: boolean;
  totalVotes: number | undefined;
  onVotes: (event: React.MouseEvent) => void;
};

const DownVotes: React.FC<DownVotesProps> = ({ isAuthUserVotes, totalVotes, onVotes }) => {
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
        <span>{totalVotes}</span>
      </div>
    </>
  );
};

export default DownVotes;
