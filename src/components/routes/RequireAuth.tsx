import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../states/store';
import LoadingPage from '../loading/LoadingPage';

function RequireAuth() {

  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.authUser);

  if (isLoading) {
    return <LoadingPage />;
  } else if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
