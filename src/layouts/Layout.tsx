import { Outlet } from 'react-router-dom';
// import Navbar from '../components/nav/Navbar';
// import { useLocation } from 'react-router-dom';
// import MobileMenu from '../components/menu/MobileMenu';
// import SideMenu from '../components/menu/SideMenu';
import BottomNav from '../components/nav/BottomNav';
import SideNav from '../components/nav/SideNav';

const Layout = () => {
  // const { pathname } = useLocation();
  // const pathAuth = pathname.includes('/auth');

  return (
    <>
      {/* {pathAuth ? null : (
        <header>
          <Navbar />
        </header>
      )} */}
      <main className='grid grid-cols-12'>
        <div className='col-span-2 hidden sm:block'>
          {/* <SideMenu /> */}
          <SideNav />
        </div>
        <div className='sm:col-span-7 col-span-full sm:border-x border-base-content'>
          <Outlet />
        </div>
        <div className='col-span-3 hidden sm:block'>
          <h1 className='text-center'>Leaderboards</h1>
        </div>
        <div className='fixed bottom-0 border-base-content sm:hidden border-t'>
          {/* <MobileMenu /> */}
          <BottomNav />
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
