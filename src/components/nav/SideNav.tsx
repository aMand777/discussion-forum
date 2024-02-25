import { FiSearch } from 'react-icons/fi';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <h1 className='font-semibold text-xl my-3 ml-7 line-clamp-1'>Forum App</h1>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive
              ? 'active text-accent __navlink_sidenav'
              : 'text-base-content __navlink_sidenav'
          }>
          <IoMdChatbubbles size={35} />
          <span className='font-semibold text-lg hidden lg:block'>Threads</span>
        </NavLink>
        <NavLink
          to='/search'
          className={({ isActive }) =>
            isActive
              ? 'active text-accent __navlink_sidenav'
              : 'text-base-content __navlink_sidenav'
          }>
          <FiSearch size={35} />
          <span className='font-semibold text-lg hidden lg:block'>Search</span>
        </NavLink>
        <NavLink
          to='/create'
          className={({ isActive }) =>
            isActive
              ? 'active text-accent __navlink_sidenav'
              : 'text-base-content __navlink_sidenav'
          }>
          <IoCreateOutline size={35} />
          <span className='font-semibold text-lg hidden lg:block'>Create</span>
        </NavLink>
        <NavLink
          to='/leaderboards'
          className={({ isActive }) =>
            isActive
              ? 'active text-accent __navlink_sidenav'
              : 'text-base-content __navlink_sidenav'
          }>
          <MdLeaderboard size={35} />
          <span className='font-semibold text-lg hidden lg:block'>Lead</span>
        </NavLink>
        <div className='dropdown dropdown-end ml-5'>
          <div tabIndex={0} role='button' className='avatar btn btn-ghost btn-circle'>
            <div className='w-8 rounded-full ring ring-offset-base-100 ring-offset-2'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
              />
            </div>
          </div>
          <span className='font-semibold text-lg absolute left-[60px] top-2 hidden lg:block'>
            Profile
          </span>
          <ul
            tabIndex={0}
            className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-28 md:w-32 lg:w-40'>
            <li>
              <a className='justify-between'>
                Profile
                {/* <span className='badge'>New</span> */}
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideNav;
