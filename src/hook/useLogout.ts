import { getUserLoginAsync } from '../states/slice/preload-slice.ts';
import { setInitialAuthState } from '../states/slice/auth-slice.ts';
import { useAppDispatch } from '../states/store.ts';
import { removeAccessToken } from '../utils/storage.ts';

const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleButtonLogout = () => {
    removeAccessToken('accessToken');
    dispatch(getUserLoginAsync());
    dispatch(setInitialAuthState());
  };

  return {
    onLogout: handleButtonLogout,
  };
};

export default useLogout;
