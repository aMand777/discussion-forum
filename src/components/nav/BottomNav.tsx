import { FiSearch } from 'react-icons/fi';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import useUser from '../../hook/useUser';
import useLogout from '../../hook/useLogout'

const BottomNav = () => {
  const { authUser } = useUser();
  const { onLogout } = useLogout()

  return (
    <>
      <div className='border-t btm-nav border-base-content'>
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
          to='/threads/create'
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
        <div className='mt-1 dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
            <div className='w-8 rounded-full ring ring-offset-base-100 ring-offset-2'>
              <img alt={`avatar/${authUser.name}`} src={authUser.avatar} />
            </div>
            <span className='btm-nav-label'>{authUser.name}</span>
          </div>
          <ul
            tabIndex={0}
            className='-mt-44 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52'>
            <li>
              <a className='justify-between'>
                Theme
                {/* <span className='badge'>New</span> */}
              </a>
            </li>
            <li>
              <NavLink to={`/${authUser.name}/${authUser.id}/posts`}>Profile</NavLink>
            </li>
            <li>
              <button onClick={() => onLogout()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
