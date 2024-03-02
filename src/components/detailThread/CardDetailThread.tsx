import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { postedAt } from '../../utils';
import parse from 'html-react-parser';
import UpVotes from '../votes/UpVotes';
import DownVotes from '../votes/DownVotes';
import useVotes from '../../hook/useVotes';
import Comments from '../Comment/Comment';
import Editor from '../Comment/Editor';
import useDetailThread from '../../hook/useDetailThread';
import useUser from '../../hook/useUser';

const CardDetailThread = () => {  
  const { authUser } = useUser()
  const {
    id: threadId,
    title,
    body,
    createdAt,
    category,
    comments,
    upVotesBy,
    downVotesBy,
    owner,
  } = useDetailThread()
  
  const { upVoteThread, downVoteThread, isUpVoteByAuthUser, isDownVoteByAuthUser } = useVotes();
    const isCommentUpVote = isUpVoteByAuthUser(upVotesBy, authUser.id);
  const isCommentDownVote = isDownVoteByAuthUser(downVotesBy, authUser.id);

  const handleButtonUpVote = (event: React.MouseEvent) => {
    event.stopPropagation();
    upVoteThread(isCommentUpVote, threadId);
  };

  const handleButtonDownVote = (event: React.MouseEvent) => {
    event.stopPropagation();
    downVoteThread(isCommentDownVote, threadId);
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
      <div className='px-2 my-3 rounded-md cursor-pointer bg-base-300 w-fit hover:bg-base-200'>#{category}</div>
      <div className='flex items-center gap-3'>
        <UpVotes
          isAuthUserVotes={isCommentUpVote}
          totalVotes={upVotesBy.length}
          onVotes={handleButtonUpVote}
        />
        <DownVotes
          isAuthUserVotes={isCommentDownVote}
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
          authUser={authUser.id}
          threadId={threadId}
        />
      ))}
    </>
  );
};

export default CardDetailThread;
