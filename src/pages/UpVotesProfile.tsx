import React from 'react';
import { useParams } from 'react-router-dom';
import useListThreads from '../hook/useListThreads.ts';
import useUser from '../hook/useUser.ts';
import CardThread from '../components/threads/CardThread.tsx';
import EmptyPosts from '../components/profile/EmptyPosts.tsx';
import HeaderProfile from '../components/profile/HeaderProfile.tsx';
import { useAppDispatch } from '../states/store.ts';
import { getAllThreadsStateAsync } from '../states/slice/threads-slice.ts';
import { getAllUsersAsync } from '../states/slice/users-slice.ts';
import SkeletonList from '../components/threads/SkeletonList.tsx';

function UpVotesProfile() {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const { threads, status } = useListThreads();
  const { users } = useUser();

  const userProfile = users.find((user) => user.id === userId);

  const threadsWithUpVotes = threads.filter((thread) => thread.upVotesBy.includes(userProfile?.id || ''));
  const filteredThreads = threadsWithUpVotes.map((thread) => ({
    ...thread,
    owner: users.find((owner) => owner.id === thread.ownerId),
  }));

  React.useEffect(() => {
    dispatch(getAllThreadsStateAsync());
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  return (
    <>
      <HeaderProfile
        id={userProfile?.id}
        name={userProfile?.name}
        email={userProfile?.email}
        avatar={userProfile?.avatar}
      />
      <div className="p-5 mt-16">
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
              userId={thread.owner?.id || ''}
              avatar={thread.owner?.avatar || ''}
              name={thread.owner?.name || ''}
            />
          ))
          : status === 'loading' && <SkeletonList loop={3} />}
        {filteredThreads.length < 1 && status !== 'loading' && <EmptyPosts />}
      </div>
    </>
  );
}

export default UpVotesProfile;
