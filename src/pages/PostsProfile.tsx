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

function PostsProfile() {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const { threads, status } = useListThreads();
  const { users } = useUser();

  const userProfile = users.find((user) => user.id === userId);

  // const postsList = threads.filter((thread) => thread.ownerId === userId);
  const posts = threads.filter((thread) => thread.ownerId === userId);
  const postsList = posts.map((post) => ({
    ...post,
    owner: users.find((owner) => owner.id === post.ownerId),
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
        {postsList.length > 0
          ? postsList.map((post) => (
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
              userId={post.owner?.id || ''}
              avatar={post.owner?.avatar || ''}
              name={post.owner?.name || ''}
            />
          ))
          : status === 'loading' && <SkeletonList loop={3} />}
        {posts.length < 1 && status !== 'loading' && <EmptyPosts />}
      </div>
    </>
  );
}

export default PostsProfile;
