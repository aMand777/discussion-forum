import React from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { postedAt } from '../../utils/index.ts';
import UpVotesComment from '../votes/UpVotesComment.tsx';
import DownVotesComment from '../votes/DownVotesComment.tsx';
import useVotes from '../../hook/useVotes.ts';

interface Owner {
  id: string;
  name: string;
  avatar: string;
}

type CommentProps = {
  commentId: string;
  content: string;
  createdAt: string;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
  authUser: string;
  threadId: string;
};

function Comment({
  commentId,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  threadId,
  authUser,
}: CommentProps) {
  const { upVoteComment, downVoteComment } = useVotes();
  const upVoteCommentByAuthUser = upVotesBy.includes(authUser);
  const downVoteCommentByAuthUser = downVotesBy.includes(authUser);

  const handleButtonUpVote = (event: React.MouseEvent) => {
    event.stopPropagation();
    upVoteComment(upVoteCommentByAuthUser, threadId, commentId);
  };

  const handleButtonDownVote = (event: React.MouseEvent) => {
    event.stopPropagation();
    downVoteComment(downVoteCommentByAuthUser, threadId, commentId);
  };

  return (
    <div key={commentId}>
      <div className="items-center gap-5 avatar">
        <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={owner.avatar} alt={`avatar/${owner.name}`} />
        </div>
        <Link to={`/${owner.name}/${owner.id}/profile`}>{owner.name}</Link>
        <span className="">•</span>
        <span className="text-xs">{postedAt(createdAt)}</span>
      </div>
      <div className="my-3 font-thin">{parse(content)}</div>
      <div className="flex items-center gap-3">
        <UpVotesComment
          commentId={commentId}
          threadId={threadId}
          isAuthUserVotes={upVoteCommentByAuthUser}
          totalVotes={upVotesBy.length}
          onVotes={handleButtonUpVote}
        />
        <DownVotesComment
          commentId={commentId}
          threadId={threadId}
          isAuthUserVotes={downVoteCommentByAuthUser}
          totalVotes={downVotesBy.length}
          onVotes={handleButtonDownVote}
        />
      </div>
      <div className="divider" />
    </div>
  );
}

export default Comment;
