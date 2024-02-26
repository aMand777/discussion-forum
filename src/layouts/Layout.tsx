import { Outlet } from 'react-router-dom';
import BottomNav from '../components/nav/BottomNav';
import SideNav from '../components/nav/SideNav';
import TableLeaderBoards from '../components/leaderboards/TableLeaderBoards';
import LoadingBar from 'react-redux-loading-bar';

const Layout = () => {

  return (
    <>
      <header className='sticky top-0'>
        <LoadingBar />
      </header>
      <main className='grid grid-cols-12'>
        <div className='col-span-2 hidden sm:block'>
          <SideNav />
        </div>
        <div className='sm:col-span-7 col-span-full sm:border-x border-base-content'>
          <Outlet />
        </div>
        <div className='col-span-3 hidden sm:block'>
          <h1 className='text-center font-bold text-xl my-3'>Leaderboards</h1>
          <TableLeaderBoards />
        </div>
        <div className='fixed bottom-0 border-base-content sm:hidden border-t'>
          <BottomNav />
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
