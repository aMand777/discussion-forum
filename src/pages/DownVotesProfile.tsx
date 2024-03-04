import React from 'react';
import useListThreads from '../hook/useListThreads';
import useUser from '../hook/useUser';
import CardThread from '../components/threads/CardThread';
import EmptyPosts from '../components/profile/EmptyPosts';
import HeaderProfile from '../components/profile/HeaderProfile';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../states/store';
import { getAllThreadsStateAsync } from '../states/slice/threads-slice';
import { getAllUsersAsync } from '../states/slice/users-slice';
import SkeletonList from '../components/threads/SkeletonList';

const DownVotesProfile = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const { threads, status } = useListThreads();
  const { users } = useUser();

  const user = users.find((user) => user.id === userId);

  const threadsWithDownVotes = threads.filter((thread) =>
    thread.downVotesBy.includes(user?.id || ''),
  );
  const filteredThreads = threadsWithDownVotes.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  React.useEffect(() => {
    dispatch(getAllThreadsStateAsync());
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  return (
    <>
      <HeaderProfile id={user?.id} name={user?.name} email={user?.email} avatar={user?.avatar} />
      <div className='p-5 mt-16'>
        {filteredThreads.length > 0
          ? filteredThreads.map((thread) => (
              <CardThread
                key={thread.id}
                threadId={thread.id}
                title={thread.title}
                body={thread.body}
                category={thread.category}
                upVotesBy={thread.upVotesBy}
                downVotesBy={thread.downVotesBy}
                totalComments={thread.totalComments}
                createdAt={thread.createdAt}
                avatar={user?.avatar}
                name={user?.name}
              />
            ))
          : status === 'loading' && <SkeletonList loop={3} />}
        {filteredThreads.length < 1 && status !== 'loading' && <EmptyPosts />}
      </div>
    </>
  );
};

export default DownVotesProfile;
