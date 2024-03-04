import React from 'react'
import { useAppDispatch } from '../states/store';
import { getAllThreadsStateAsync } from '../states/slice/threads-slice';
import { getAllUsersAsync } from '../states/slice/users-slice';
import CardThread from '../components/threads/CardThread';
import useListThreads from '../hook/useListThreads'
import useUser from '../hook/useUser'

const Threads = () => {
  const dispatch = useAppDispatch()
  const { threads } = useListThreads()
  const { users } = useUser()
  
  React.useEffect(() => {
    dispatch(getAllThreadsStateAsync())
    dispatch(getAllUsersAsync());
  }, [dispatch])

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }))
  
  return (
    <>
      <div className='w-full p-5 mx-auto md:w-10/12'>
        {threadsList.map((thread) => (
          <CardThread
            key={thread.id}
            threadId={thread.id}
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
        ))}
      </div>
    </>
  );
}

export default Threads