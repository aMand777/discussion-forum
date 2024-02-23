import { Outlet } from 'react-router-dom';
import Navbar from '../components/nav/Navbar';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const { pathname } = useLocation();
  const pathAuth = pathname.includes('/auth');

  return (
    <>
      {pathAuth ? null : (
        <header>
          <Navbar />
        </header>
      )}
      <main>
        {/* <AlertConfirm /> */}
        <Outlet />
      </main>
      <footer>{/* <h1>Footer</h1> */}</footer>
    </>
  );
};

export default Layout;
