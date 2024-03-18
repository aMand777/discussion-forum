/* eslint-disable no-else-return */
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../states/store.ts';
import LoadingPage from '../loading/LoadingPage.tsx';

function RequireAuth() {
  const { isAuthenticated, isPreload } = useAppSelector(
    (state) => state.preload,
  );

  if (isPreload) {
    return <LoadingPage type="loading-infinity" size="loading-lg" />;
  } else if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
