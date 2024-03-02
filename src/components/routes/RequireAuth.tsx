import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../states/store';
import LoadingPage from '../loading/LoadingPage';

function RequireAuth() {
  const { isAuthenticated, isPreload } = useAppSelector((state) => state.preload);

  if (isPreload) {
    return <LoadingPage loading='loading-infinity loading-lg' />;
  } else if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
