import useListThreads from '../../hook/useListThreads';
import useUser from '../../hook/useUser';
import CardThread from '../threads/CardThread';
import EmptyPosts from './EmptyPosts';
import HeaderProfile from './HeaderProfile';
import { useParams } from 'react-router-dom';

const DownVotesProfile = () => {
  const { userId } = useParams();
  const { threads } = useListThreads();
  const { users } = useUser();

  const user = users.find((user) => user.id === userId);

  const threadsWithDownVotes = threads.filter((thread) =>
    thread.downVotesBy.includes(user?.id || ''),
  );
  const filteredThreads = threadsWithDownVotes.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  return (
    <>
      <HeaderProfile id={user?.id} name={user?.name} email={user?.email} avatar={user?.avatar} />
      <div className='p-5 mt-16'>
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
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
        ) : (
          <EmptyPosts />
        )}
      </div>
    </>
  );
};

export default DownVotesProfile;
