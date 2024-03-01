import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { postedAt } from '../../utils';
import parse from 'html-react-parser';
import UpVotes from '../votes/UpVotes';
import DownVotes from '../votes/DownVotes';
import useVotes from '../../hook/useVotes';
import Comments from '../Comment/Comment';
import { RootState } from '../../states/store';
import { useSelector } from 'react-redux';
import Editor from '../Comment/Editor';

const CardDetailThread = () => {
  const { upVoteThread, downVoteThread } = useVotes();
  const { id: authUser } = useSelector((state: RootState) => state.authUser.data);
  const {
    id: threadId,
    title,
    body,
    createdAt,
    comments,
    upVotesBy,
    downVotesBy,
    owner,
  } = useSelector((state: RootState) => state.detailThread.value);
  const isThreadUpVoteByAuthUser = upVotesBy
    ? upVotesBy.filter((vote: string) => vote === authUser).length > 0
    : false;
  const isThreadDownVoteByAuthUser = downVotesBy
    ? downVotesBy.filter((vote: string) => vote === authUser).length > 0
    : false;

  const handleButtonUpVote = (event: React.MouseEvent) => {
    event.stopPropagation();
    upVoteThread(isThreadUpVoteByAuthUser, threadId || '');
  };

  const handleButtonDownVote = (event: React.MouseEvent) => {
    event.stopPropagation();
    downVoteThread(isThreadDownVoteByAuthUser, threadId || '');
  };

  return (
    <>
      <div className='items-center gap-5 avatar'>
        <div className='w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
          <img src={owner.avatar} alt={`avatar/${owner.avatar}`} />
        </div>
        <span>{owner.name}</span>
        <span className=''>•</span>
        <span className='text-xs'>{postedAt(createdAt)}</span>
      </div>
      <div className='my-2 font-semibold'>{parse(title)}</div>
      <div className='font-thin'>{parse(body)}</div>
      <div className='flex items-center gap-3'>
        <UpVotes
          isAuthUserVotes={isThreadUpVoteByAuthUser}
          totalVotes={upVotesBy.length}
          onVotes={handleButtonUpVote}
        />
        <DownVotes
          isAuthUserVotes={isThreadDownVoteByAuthUser}
          totalVotes={downVotesBy.length}
          onVotes={handleButtonDownVote}
        />
        <AiOutlineComment className='w-7 h-7' />
        <span>{comments.length}</span>
      </div>
      <div className='divider'></div>
      <Editor threadId={threadId} />
      <div className='divider'></div>
      {comments.map((comment) => (
        <Comments
          key={comment.id}
          commentId={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          owner={comment.owner}
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          authUser={authUser}
          threadId={threadId}
        />
      ))}
    </>
  );
};

export default CardDetailThread;
