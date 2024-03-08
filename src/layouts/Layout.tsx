import { Outlet } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import BottomNav from '../components/nav/BottomNav.tsx';
import SideNav from '../components/nav/SideNav.tsx';
import TableLeaderBoards from '../components/leaderboards/TableLeaderBoards.tsx';
import ModalSearchCategory from '../components/search/ModalSearchCategory.tsx';
import ModalSearchUser from '../components/search/ModalSearchUser.tsx';

function Layout() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <ModalSearchCategory />
        <ModalSearchUser />
        <LoadingBar className="h-1 bg-accent" />
      </header>
      <div className="grid grid-cols-12">
        <nav className="hidden col-span-2 sm:block">
          <SideNav />
        </nav>
        <main className="h-screen overflow-y-scroll sm:col-span-7 col-span-full sm:border-x border-base-300 scroll-none">
          <Outlet />
        </main>
        <aside className="hidden col-span-3 sm:block">
          <h1 className="my-3 text-xl font-bold text-center">Leaderboards</h1>
          <TableLeaderBoards />
        </aside>
        <nav className="fixed bottom-0 border-t border-base-content sm:hidden">
          <BottomNav />
        </nav>
      </div>
    </>
  );
}

export default Layout;
