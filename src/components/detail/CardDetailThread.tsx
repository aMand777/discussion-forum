import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { postedAt } from '../../utils/index.ts';
import useVotes from '../../hook/useVotes.ts';
import useUser from '../../hook/useUser.ts';
import useDetailThread from '../../hook/useDetailThread.ts';
import UpVotesThread from '../votes/UpVotesThread.tsx';
import DownVotesThread from '../votes/DownVotesThread.tsx';
import Comments from '../comments/Comment.tsx';
import Editor from '../comments/Editor.tsx';
import SkeletonDetail from './SkeletonDetail.tsx';
import NotFound from '../notFound/NotFound.tsx';

function CardDetailThread() {
  const { authUser } = useUser();
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
    status,
  } = useDetailThread();

  const {
    upVoteThread,
    downVoteThread,
    isUpVoteByAuthUser,
    isDownVoteByAuthUser,
  } = useVotes();
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
      {title ? (
        <div className="mb-12 lg:mb-1">
          <div className="items-center gap-5 avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={owner.avatar} alt={`/avatar/${owner.name}`} />
            </div>
            <Link to={`/${owner.name}/${owner.id}/profile`}>{owner.name}</Link>
            <span className="">•</span>
            <span className="text-xs">{postedAt(createdAt)}</span>
          </div>
          <div className="my-2 font-semibold">{parse(title)}</div>
          <div className="font-thin">{parse(body)}</div>
          <Link
            to={`/threads/categories/${category}`}
            className="px-2 my-3 rounded-md cursor-pointer bg-base-300 w-fit hover:bg-base-200"
          >
            #
            { category }
          </Link>
          <div className="flex items-center gap-3">
            <UpVotesThread
              threadId={threadId}
              isAuthUserVotes={isCommentUpVote}
              totalVotes={upVotesBy.length}
              onVotes={handleButtonUpVote}
            />
            <DownVotesThread
              threadId={threadId}
              isAuthUserVotes={isCommentDownVote}
              totalVotes={downVotesBy.length}
              onVotes={handleButtonDownVote}
            />
            <Link
              to={`/threads/${owner.name}/${threadId}`}
              className="flex items-center gap-2"
            >
              <AiOutlineComment className="w-7 h-7" />
              <span>{comments.length}</span>
            </Link>
          </div>
          <div className="divider" />
          <Editor threadId={threadId} />
          <div className="divider" />
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
        </div>
      ) : (
        <SkeletonDetail />
      )}
      {title.length < 1 && status !== 'loading' && (
        <NotFound title="Thread not found" />
      )}
    </>
  );
}

export default CardDetailThread;
