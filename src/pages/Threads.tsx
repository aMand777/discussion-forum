import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../states/store';
import { getAllThreadsStateAsync } from '../states/slice/threads-slice';
import { getAllUsersAsync } from '../states/slice/users-slice';
import CardThread from '../components/threads/CardThread';
import Category from '../components/threads/Category';

const Threads = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { threads } = useSelector((state: RootState) => state.threads)
  const { users } = useSelector((state: RootState) => state.users)
  console.log('threads==>', threads)
  console.log('users==>', users)

  React.useEffect(() => {
    dispatch(getAllThreadsStateAsync())
    dispatch(getAllUsersAsync());
  }, [dispatch])

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId)
  }))

  console.log('threadsList===>', threadsList)
  
  return (
    <>
      <Category />
      <div className='w-full md:w-10/12 mx-auto h-screen p-5 overflow-y-scroll scroll-none'>
        {threadsList.map((thread) => (
          <CardThread
            key={thread.id}
            avatar={thread.user?.avatar}
            name={thread.user?.name}
            title={thread.title}
            body={thread.body}
            totalComments={thread.totalComments}
            createdAt={thread.createdAt}
            totalUpVotes={thread.upVotesBy.length}
            totalDownVotes={thread.downVotesBy.length}
            
          />
        ))}
        {/* <CardThread />
        <CardThread />
        <CardThread />
        <CardThread />
        <CardThread />
        <CardThread /> */}
      </div>
    </>
  );
}

export default Threads