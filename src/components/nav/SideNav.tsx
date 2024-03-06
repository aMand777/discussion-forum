import { FiSearch } from 'react-icons/fi';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import useUser from '../../hook/useUser';
import useLogout from '../../hook/useLogout';
import { openModal } from '../../utils';
import Swap from './Swap';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa';

const SideNav = () => {
  const { authUser } = useUser();
  const { onLogout } = useLogout();

  return (
    <>
      <div className='flex flex-col gap-5'>
        <h1 className='my-3 text-xl font-semibold ml-7 line-clamp-1'>Forum App</h1>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive
              ? 'active text-accent __navlink_sidenav'
              : 'text-base-content __navlink_sidenav'
          }>
          <IoMdChatbubbles size={35} />
          <span className='hidden text-lg font-semibold lg:block'>Threads</span>
        </NavLink>
        <button
          onClick={() => openModal('modal_search')}
          className='btn btn-ghost btn-accent flex justify-start gap-7 focus:text-accent focus:outline-0'>
          <FiSearch size={35} />
          <span className='hidden text-lg font-semibold lg:block'>Search</span>
        </button>
        <NavLink
          to='/threads/create'
          className={({ isActive }) =>
            isActive
              ? 'active text-accent __navlink_sidenav'
              : 'text-base-content __navlink_sidenav'
          }>
          <IoCreateOutline size={35} />
          <span className='hidden text-lg font-semibold lg:block'>Create</span>
        </NavLink>
        <NavLink
          to='/leaderboards'
          className={({ isActive }) =>
            isActive
              ? 'active text-accent __navlink_sidenav'
              : 'text-base-content __navlink_sidenav'
          }>
          <MdLeaderboard size={35} />
          <span className='hidden text-lg font-semibold lg:block'>Lead</span>
        </NavLink>
        <div className='ml-5 dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='avatar btn btn-ghost btn-circle'>
            <div className='w-8 rounded-full ring ring-offset-base-100 ring-offset-2'>
              <img alt={`avatar/${authUser.name}`} src={authUser.avatar} />
            </div>
          </div>
          <span className='font-semibold text-lg absolute left-[60px] top-2 hidden lg:block line-clamp-1'>
            {authUser.name}
          </span>
          <ul
            tabIndex={0}
            className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-28 md:w-32 lg:w-40'>
            <li>
              <a className='justify-between'>
                Theme
                <Swap />
              </a>
            </li>
            <li>
              <NavLink
                to={`/${authUser.name}/${authUser.id}/profile`}
                className='mt-2 justify-between'>
                Profile
                <FaUserTie className='w-5 h-5' />
              </NavLink>
            </li>
            <li>
              <button onClick={() => onLogout()} className='mt-2 justify-between'>
                Logout
                <AiOutlineLogout className='w-5 h-5 text-error' />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideNav;
