import React from 'react'
import { useAppDispatch } from '../states/store';
import { getAllThreadsStateAsync } from '../states/slice/threads-slice';
import { getAllUsersAsync } from '../states/slice/users-slice';
import CardThread from '../components/threads/CardThread';
import useListThreads from '../hook/useListThreads'
import useUser from '../hook/useUser'
import SkeletonList from '../components/threads/SkeletonList';
import EmptyPosts from '../components/profile/EmptyPosts';

const Threads = () => {
  const dispatch = useAppDispatch()
  const { threads, status } = useListThreads()
  const { users } = useUser()
  
  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }))
  
  React.useEffect(() => {
    dispatch(getAllThreadsStateAsync())
    dispatch(getAllUsersAsync());
  }, [dispatch])
  
  return (
    <>
      <div className='w-full p-5 mx-auto md:w-10/12'>
        {threadsList.length > 0 ? (
          threadsList.map((thread) => (
            <CardThread
              key={thread.id}
              threadId={thread.id}
              userId={thread.user?.id}
              avatar={thread.user?.avatar}
              name={thread.user?.name}
              title={thread.title}
              body={thread.body}
              category={thread.category}
              totalComments={thread.totalComments}
              createdAt={thread.createdAt}
              upVotesBy={thread.upVotesBy}
              downVotesBy={thread.downVotesBy}
            />
            ))
            ) : status === 'loading' && <SkeletonList loop={3} />}
        {threadsList.length < 1 && status !== 'loading' && <EmptyPosts />}
      </div>
    </>
  );
}

export default Threads