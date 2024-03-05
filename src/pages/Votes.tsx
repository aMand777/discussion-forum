import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useListThreads from '../hook/useListThreads';
import useUser from '../hook/useUser';
// import ModalVotes from '../components/votes/ModalVotes';
import { openModal } from '../utils';

const Votes = () => {
  const { threadId } = useParams();
  const { threads } = useListThreads();
  const { users } = useUser();

  const votesByUser = threads
    .filter((threads) => threads.id === threadId)
    .map((votes) => votes.upVotesBy)[0];
  const usersUpVotes = users.filter((user) => votesByUser.includes(user.id));
  // console.log('votesByUser', votesByUser)
  // console.log('usersUpVotes', usersUpVotes)
  React.useEffect(() => {
    openModal('my_modal_2');
  }, []);

  return (
    <div>
      {usersUpVotes.map((user) => (
        <div className='avatar flex gap-5 items-center justify-between'>
          <div className='w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src={user.avatar} alt={`avatar-${user.name}`} />
          </div>
          <span>{user.name}</span>
          <Link to={`/${user.name}/${user.id}/profile`} className='btn btn-outline btn-accent'>
            Detail
          </Link>
        </div>
      ))}
      {/* <ModalVotes /> */}
    </div>
  );
};

export default Votes;
