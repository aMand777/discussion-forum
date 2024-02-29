import { getUserLoginAsync } from '../states/slice/authUser-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../states/store';
import { removeAccessToken } from '../utils/storage';

const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  
    const handleButtonLogout = () => {
      removeAccessToken('accessToken');
      dispatch(getUserLoginAsync());
    };

  return {
    onLogout: handleButtonLogout
  }
}

export default useLogout