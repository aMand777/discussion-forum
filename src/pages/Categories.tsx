import React from 'react';
import { useParams } from 'react-router-dom';
import useListThreads from '../hook/useListThreads.ts';
import useUser from '../hook/useUser.ts';
import CardThread from '../components/threads/CardThread.tsx';
import SkeletonList from '../components/threads/SkeletonList.tsx';
import { useAppDispatch } from '../states/store.ts';
import { getAllThreadsStateAsync } from '../states/slice/threads-slice.ts';
import { getAllUsersAsync } from '../states/slice/users-slice.ts';
import NotFound from '../components/notFound/NotFound.tsx';

function Categories() {
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const { threads, status } = useListThreads();
  const { users } = useUser();
  const threadsByCategories = threads.filter(
    (thread) => thread.category === category,
  );
  const threadsList = threadsByCategories.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  React.useEffect(() => {
    dispatch(getAllUsersAsync());
    dispatch(getAllThreadsStateAsync());
  }, [dispatch]);

  return (
    <div className="w-full p-5 mx-auto md:w-10/12">
      {threadsList.length > 0
        ? threadsList.map((thread) => (
          <CardThread
            key={thread.id}
            threadId={thread.id}
            userId={thread.user?.id || ''}
            avatar={thread.user?.avatar || ''}
            name={thread.user?.name || ''}
            title={thread.title}
            body={thread.body}
            category={thread.category}
            totalComments={thread.totalComments}
            createdAt={thread.createdAt}
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
          />
        ))
        : status === 'loading' && <SkeletonList loop={3} />}
      {threadsList.length < 1 && status !== 'loading' && (
        <NotFound title="Categories not found" />
      )}
    </div>
  );
}

export default Categories;
