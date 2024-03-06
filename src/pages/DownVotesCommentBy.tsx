import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useUser from '../hook/useUser';
import { IoHeartDislikeSharp } from 'react-icons/io5';
import { IoIosArrowBack } from 'react-icons/io';
import useDetailThread from '../hook/useDetailThread';
import { useAppDispatch } from '../states/store'
import { getDetailThreadAsync } from '../states/slice/detail-thread-slice';
import { getAllUsersAsync } from '../states/slice/users-slice';

const UpVotesCommentBy = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { threadId, commentId } = useParams();
  const { users } = useUser();
  const { comments } = useDetailThread()
  const votesByUser = comments
    .filter((comment) => comment.id === commentId)
    .map((votes) => votes.downVotesBy)[0];
  const usersVotes = users.filter((user) => votesByUser.includes(user.id));

    const handleGoBack = () => {
      navigate(-1);
  };
  
    React.useEffect(() => {
      dispatch(getDetailThreadAsync(threadId || ''));
      dispatch(getAllUsersAsync());
  }, [dispatch, threadId]);

  return (
    <div className='p-10'>
      <button
        onClick={handleGoBack}
        className='flex items-center cursor-pointer group w-fit hover:text-accent'>
        <IoIosArrowBack className='w-7 h-7' />
        <span className='font-semibold text-lg group-hover:ml-1 duration-500'>Back</span>
      </button>
      <div className='flex items-center justify-center gap-5'>
        <h1 className='text-center text-xl font-bold my-5'>User Down Votes</h1>
        <IoHeartDislikeSharp className='text-error w-7 h-7' />
      </div>
      {usersVotes.map((user) => (
        <div key={user.id} className='avatar flex items-center justify-between my-5'>
          <div className='w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src={user.avatar} alt={`avatar-${user.name}`} />
          </div>
          <span>{user.name}</span>
          <Link to={`/${user.name}/${user.id}/profile`} className='btn btn-outline btn-accent'>
            Detail
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UpVotesCommentBy;
