import { FiSearch } from 'react-icons/fi';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const SideMenu = () => {
  const { pathname } = useLocation();

  return (
    <>
      <h1 className='font-semibold text-xl my-3 ml-7'>Forum App</h1>
      <ul className='menu rounded-box'>
        <li className='my-3'>
          <Link to='/'>
            <IoMdChatbubbles
              size={35}
              className={`${pathname.match('/') ? 'text-accent' : 'text-base-content'}`}
            />
            <span className='ml-3 font-semibold text-lg'>Threads</span>
          </Link>
        </li>
        <li className='my-3'>
          <Link to='/search'>
            <FiSearch
              size={35}
              className={`${pathname.match('/search') ? 'text-accent' : 'text-base-content'}`}
            />
            <span className='ml-3 font-semibold text-lg'>Search</span>
          </Link>
        </li>
        <li className='my-3'>
          <Link to='/create'>
            <IoCreateOutline
              size={35}
              className={`${pathname.match('/create') ? 'text-accent' : 'text-base-content'}`}
            />
            <span className='ml-3 font-semibold text-lg'>Create</span>
          </Link>
        </li>
        <li className='my-3'>
          <Link to='/leaderboards'>
            <MdLeaderboard
              size={35}
              className={`${
                pathname.match('/leaderboards') ? 'text-accent' : 'text-base-content'
              }`}
            />
            <span className='ml-3 font-semibold text-lg'>Leaderboards</span>
          </Link>
        </li>
      </ul>
      <div className='dropdown ml-6 my-3'>
        <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
          <div
            className={`w-12 rounded-full ring ring-offset-base-100 ring-offset-2 ${
              pathname.match('/user') ? 'ring-accent' : 'ring-primary'
            }`}>
            <img
              alt='Tailwind CSS Navbar component'
              src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52'>
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
    </>
  );
};

export default SideMenu;
