import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoHeart } from 'react-icons/io5';
import { IoIosArrowBack } from 'react-icons/io';
import useUser from '../hook/useUser.ts';
import useDetailThread from '../hook/useDetailThread.ts';
import { useAppDispatch } from '../states/store.ts';
import { getDetailThreadAsync } from '../states/slice/detail-thread-slice.ts';
import { getAllUsersAsync } from '../states/slice/users-slice.ts';

function UpVotesCommentBy() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { threadId, commentId } = useParams();
  const { users, authUser } = useUser();
  const { comments } = useDetailThread();
  const votesByUser = comments
    .filter((comment) => comment.id === commentId)
    .map((votes) => votes.upVotesBy)[0];
  const usersVotes = users.filter((user) => votesByUser.includes(user.id));

  const handleGoBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    dispatch(getDetailThreadAsync(threadId || ''));
    dispatch(getAllUsersAsync());
  }, [dispatch, threadId]);

  return (
    <div className="p-10">
      <button
        type="button"
        onClick={handleGoBack}
        className="flex items-center cursor-pointer group w-fit hover:text-accent"
      >
        <IoIosArrowBack className="w-7 h-7" />
        <span className="font-semibold text-lg group-hover:ml-1 duration-500">
          Back
        </span>
      </button>
      <div className="flex items-center justify-center gap-5">
        <h1 className="text-center text-xl font-bold my-5">User Up Votes</h1>
        <IoHeart className="p-0 text-error w-7 h-7" />
      </div>
      {usersVotes.map((user) => (
        <div
          key={user.id}
          className="avatar flex items-center justify-between my-5"
        >
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.avatar} alt={`avatar-${user.name}`} />
          </div>
          <span className="w-full text-center">
            {user.name}
            {user.id === authUser.id && <span className="ml-1">(You)</span>}
          </span>
          <Link
            to={`/${user.name}/${user.id}/profile`}
            className="btn btn-outline btn-accent"
          >
            Detail
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UpVotesCommentBy;
