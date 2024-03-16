import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../states/store.ts';
import useUser from '../hook/useUser.ts';
import { getAllUsersAsync } from '../states/slice/users-slice.ts';
import NotFound from '../components/notFound/NotFound.tsx';
import SkeletonListUser from '../components/loading/SkeletonListUser.tsx';

function Users() {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const { users, authUser, status } = useUser();

  const searchUsers = users.filter((user) => user.name.toLowerCase().includes(username || 'default'));

  React.useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  return (
    <div className="p-10 mb-7 lg:mb-0">
      <h1 className="text-xl font-semibold text-center">
        { searchUsers.length }
        &nbsp; Result for
          &nbsp;
        <q className="text-info">
          { username }
        </q>
      </h1>
      {searchUsers.length > 0
        ? searchUsers.map((user) => (
          <div
            key={user.id}
            className="avatar flex items-center justify-between my-5"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.avatar} alt={`avatar-${user.name}`} />
            </div>
            <span className="w-full text-center">
              {user.name}
              {user.id === authUser.id && (
                <span className="ml-1 text-accent">(You)</span>
              )}
            </span>
            <Link
              to={`/${user.name}/${user.id}/profile`}
              className="btn btn-outline btn-accent"
            >
              Detail
            </Link>
          </div>
        ))
        : status === 'loading' && <SkeletonListUser loop={10} />}
      {searchUsers.length < 1 && status !== 'loading' && (
        <NotFound title="User not found" />
      )}
    </div>
  );
}

export default Users;
