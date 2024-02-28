import React from 'react'
import UpVotes from '../votes/UpVotes';
import DownVotes from '../votes/DownVotes';
import { AiOutlineComment } from 'react-icons/ai';

type FooterComment = {
  isUpVoteByAuthUser: boolean;
  isDownVoteByAuthUser: boolean;
  totalUpVotes: number;
  totalDownVotes: number;
  handleButtonUpVote: () => void;
  handleButtonDownVote: () => void;
  totalComments: number
};

const FooterComment: React.FC<FooterComment> = ({
  isUpVoteByAuthUser,
  isDownVoteByAuthUser,
  totalUpVotes,
  totalDownVotes,
  handleButtonUpVote,
  handleButtonDownVote,
  totalComments,
}) => {
  return (
    <>
      <div className='flex items-center gap-3'>
        <UpVotes
          isAuthUserVotes={isUpVoteByAuthUser}
          totalVotes={totalUpVotes}
          onVotes={handleButtonUpVote}
        />
        <DownVotes
          isAuthUserVotes={isDownVoteByAuthUser}
          totalVotes={totalDownVotes}
          onVotes={handleButtonDownVote}
        />
        <AiOutlineComment className='w-7 h-7' />
        <span>{totalComments}</span>
      </div>
    </>
  );
};

export default FooterComment