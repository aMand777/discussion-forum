import React from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { openModal } from '../../utils';
import ModalVotes from './ModalVotes';

type UpVotesProps = {
  isAuthUserVotes: boolean;
  totalVotes: number | undefined;
  onVotes: (event: React.MouseEvent) => void;
};

const UpVotes: React.FC<UpVotesProps> = ({ isAuthUserVotes, totalVotes, onVotes }) => {

  const handleButtonClick = () => {
    openModal('my_modal_2');
  };

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
        <button onClick={handleButtonClick}>{totalVotes}</button>
        {/* <Link to={`/thread/${threadId}`}>{totalVotes}</Link> */}
      </div>
      <ModalVotes />
    </>
  );
};

export default UpVotes;
