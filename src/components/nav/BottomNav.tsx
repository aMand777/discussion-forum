import { FiSearch } from 'react-icons/fi';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  return (
    <>
      <div className='btm-nav border-base-content border-t'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'active text-accent' : 'text-base-content')}>
          <IoMdChatbubbles size={35} />
          <span className='btm-nav-label'>Threads</span>
        </NavLink>
        <NavLink
          to='/search'
          className={({ isActive }) => (isActive ? 'active text-accent' : 'text-base-content')}>
          <FiSearch size={35} />
          <span className='btm-nav-label'>Search</span>
        </NavLink>
        <NavLink
          to='/create'
          className={({ isActive }) => (isActive ? 'active text-accent' : 'text-base-content')}>
          <IoCreateOutline size={35} />
          <span className='btm-nav-label'>Create</span>
        </NavLink>
        <NavLink
          to='/leaderboards'
          className={({ isActive }) => (isActive ? 'active text-accent' : 'text-base-content')}>
          <MdLeaderboard size={35} />
          <span className='btm-nav-label'>Lead</span>
        </NavLink>
        <div className='dropdown dropdown-end mt-1'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
            <div className='w-8 rounded-full ring ring-offset-base-100 ring-offset-2'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
              />
            </div>
            <span className='btm-nav-label'>Profile</span>
          </div>
          <ul
            tabIndex={0}
            className='-mt-44 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52'>
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
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

export default BottomNav;
