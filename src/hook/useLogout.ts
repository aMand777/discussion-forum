import { getUserLoginAsync } from '../states/slice/auth-user-slice';
import { useAppDispatch } from '../states/store';
import { removeAccessToken } from '../utils/storage';

const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleButtonLogout = () => {
    removeAccessToken('accessToken');
    dispatch(getUserLoginAsync());
  };

  return {
    onLogout: handleButtonLogout,
  };
};

export default useLogout;
