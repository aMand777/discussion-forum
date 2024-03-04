import React from 'react'
import useListThreads from '../../hook/useListThreads';
import useUser from '../../hook/useUser';
import CardThread from '../threads/CardThread';
import EmptyPosts from './EmptyPosts';
import HeaderProfile from './HeaderProfile';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../states/store'
import { getAllThreadsStateAsync } from '../../states/slice/threads-slice';
import { getAllUsersAsync } from '../../states/slice/users-slice';

const PostsProfile = () => {
  const dispatch = useAppDispatch()
  const { userId } = useParams();
  const { threads } = useListThreads();
  const { users } = useUser();

  const user = users.find((user) => user.id === userId);

  const posts = threads.filter((thread) => thread.ownerId === userId);

  React.useEffect(() => {
    dispatch(getAllThreadsStateAsync());
    dispatch(getAllUsersAsync())
  }, [dispatch])

  return (
    <>
      <HeaderProfile id={user?.id} name={user?.name} email={user?.email} avatar={user?.avatar} />
      <div className='p-5 mt-16'>
        {posts.length > 0 ? posts.map((post) => (
          <CardThread
            key={post.id}
            threadId={post.id}
            title={post.title}
            body={post.body}
            category={post.category}
            upVotesBy={post.upVotesBy}
            downVotesBy={post.downVotesBy}
            totalComments={post.totalComments}
            createdAt={post.createdAt}
            avatar={user?.avatar}
            name={user?.name}
          />
        )) : <EmptyPosts />}
      </div>
    </>
  );
};

export default PostsProfile;
