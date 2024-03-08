import { useAppSelector } from '../states/store.ts';

const useUser = () => {
  const { authUser } = useAppSelector((state) => state.user);
  const { users, status } = useAppSelector((state) => state.users);

  return { authUser, users, status };
};

export default useUser;
