import { FiSearch } from 'react-icons/fi';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = () => {
  const { pathname } = useLocation();

  return (
    <>
      <ul className='menu menu-horizontal rounded-box'>
        <li>
          <Link to='/' className='flex flex-col gap-0'>
            <IoMdChatbubbles
              size={35}
              className={`${pathname.match('/') ? 'text-accent' : 'text-base-content'}`}
            />
            <span className='text-xs'>Threads</span>
          </Link>
        </li>
        <li>
          <Link to='/search' className='flex flex-col gap-0'>
            <FiSearch
              size={35}
              className={`${pathname.match('/search') ? 'text-accent' : 'text-base-content'}`}
            />
            <span className='text-xs'>Search</span>
          </Link>
        </li>
        <li>
          <Link to='/create' className='flex flex-col gap-0'>
            <IoCreateOutline
              size={35}
              className={`${pathname.match('/create') ? 'text-accent' : 'text-base-content'}`}
            />
            <span className='text-xs'>Create</span>
          </Link>
        </li>
        <li>
          <Link to='/leaderboards' className='flex flex-col gap-0'>
            <MdLeaderboard
              size={35}
              className={`${
                pathname.match('/leaderboards') ? 'text-accent' : 'text-base-content'
              }`}
            />
            <span className='text-xs'>Lead</span>
          </Link>
        </li>
      </ul>
      <div className='dropdown dropdown-end mt-4 mr-4'>
        <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
          <div
            className={`w-10 rounded-full ring ring-offset-base-100 ring-offset-2 ${
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
    </>
  );
};

export default MobileMenu;
