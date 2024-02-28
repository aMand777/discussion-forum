import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../states/store';
import { getAllThreadsStateAsync } from '../states/slice/threads-slice';
import { getAllUsersAsync } from '../states/slice/users-slice';
import CardThread from '../components/threads/CardThread';
// import Category from '../components/threads/Category';

const Threads = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, threads, authUser } = useSelector((state: RootState) => state)

  React.useEffect(() => {
    dispatch(getAllThreadsStateAsync())
    dispatch(getAllUsersAsync());
  }, [dispatch])

  const threadsList = threads.value.map((thread) => ({
    ...thread,
    user: users.value.find((user) => user.id === thread.ownerId),
    authUser: authUser.data.id,
  }))
  
  return (
    <>
      {/* <Category /> */}
      <div className='w-full p-5 mx-auto md:w-10/12'>
        {threadsList.map((thread) => (
          <CardThread
            key={thread.id}
            threadId={thread.id}
            avatar={thread.user?.avatar}
            name={thread.user?.name}
            title={thread.title}
            body={thread.body}
            totalComments={thread.totalComments}
            createdAt={thread.createdAt}
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
            authUser={thread.authUser}
          />
        ))}
      </div>
    </>
  );
}

export default Threads