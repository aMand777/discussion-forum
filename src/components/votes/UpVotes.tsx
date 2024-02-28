import React from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

type UpVotesProps = {
  isAuthUserVotes: boolean
  totalVotes: number | undefined
  onVotes: (event: React.MouseEvent) => void
}

const UpVotes: React.FC<UpVotesProps> = ({ isAuthUserVotes, totalVotes, onVotes }) => {
  return (
    <>
      <div className='flex items-center gap-2'>
        <button onClick={onVotes} className='p-0 rounded-full btn btn-ghost hover:bg-base-100'>
          {isAuthUserVotes ? (
            <IoHeart className='p-0 text-red-500 w-7 h-7' />
          ) : (
            <IoHeartOutline className='w-7 h-7' />
          )}
        </button>
        <span>{totalVotes}</span>
      </div>
    </>
  );
}

export default UpVotes