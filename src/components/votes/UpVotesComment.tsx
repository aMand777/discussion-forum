/* eslint-disable no-unused-vars */
import React from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type UpVotesCommentProps = {
  commentId: string;
  threadId: string;
  isAuthUserVotes: boolean;
  totalVotes: number | undefined;
  onVotes: (event: React.MouseEvent) => void;
};

function UpVotesComment({
  commentId,
  threadId,
  isAuthUserVotes,
  totalVotes,
  onVotes,
}: UpVotesCommentProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onVotes}
        className="p-0 rounded-full btn btn-ghost hover:bg-base-100"
      >
        {isAuthUserVotes ? (
          <IoHeart className="p-0 text-error w-7 h-7" />
        ) : (
          <IoHeartOutline className="w-7 h-7" />
        )}
      </button>
      {totalVotes && totalVotes > 0 ? (
        <Link to={`/${threadId}/${commentId}/upvotes_by`}>{totalVotes}</Link>
      ) : (
        <span>{totalVotes}</span>
      )}
    </div>
  );
}

export default UpVotesComment;
