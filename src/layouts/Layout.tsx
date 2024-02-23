import { Outlet } from 'react-router-dom';
// import Navbar from '../components/nav/Navbar';
// import { useLocation } from 'react-router-dom';
import MobileMenu from '../components/menu/MobileMenu';
import SideMenu from '../components/menu/SideMenu';

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
        <div className='col-span-3 hidden sm:block'>
          <SideMenu />
        </div>
        <div className='sm:col-span-6 col-span-full bg-slate-700'>
          <Outlet />
        </div>
        <div className='col-span-3 hidden sm:block'>
          <h1 className='text-center'>Leaderboards</h1>
        </div>
        <div className='fixed bottom-0 flex justify-center w-full border-base-content sm:hidden border-t'>
          <MobileMenu />
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
