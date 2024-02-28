import React from 'react';
import parse from 'html-react-parser';
import { postedAt } from '../../utils';
import UpVotes from '../votes/UpVotes';
import DownVotes from '../votes/DownVotes';
import useVotes from '../../hook/useVotes';

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

const Comment: React.FC<CommentProps> = ({
  commentId,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  threadId,
  authUser,
}) => {
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
    <>
      <div key={commentId}>
        <div className='items-center gap-5 avatar'>
          <div className='w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src={owner.avatar} />
          </div>
          <span>{owner.name}</span>
          <span className=''>•</span>
          <span className='text-xs'>{postedAt(createdAt)}</span>
        </div>
        <div className='my-3 font-thin'>{parse(content)}</div>
        <div className='flex items-center gap-3'>
          <UpVotes
            isAuthUserVotes={upVoteCommentByAuthUser}
            totalVotes={upVotesBy.length}
            onVotes={handleButtonUpVote}
          />
          <DownVotes
            isAuthUserVotes={downVoteCommentByAuthUser}
            totalVotes={downVotesBy.length}
            onVotes={handleButtonDownVote}
          />
        </div>
        <div className='divider'></div>
      </div>
    </>
  );
};

export default Comment;
