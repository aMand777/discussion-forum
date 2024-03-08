/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import { FiSearch } from 'react-icons/fi';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa';
import { CiUser, CiHashtag } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import { openModal } from '../../utils/index.ts';
import useUser from '../../hook/useUser.ts';
import useLogout from '../../hook/useLogout.ts';
import Swap from './Swap.tsx';

function SideNav() {
  const { authUser } = useUser();
  const { onLogout } = useLogout();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="my-3 text-xl font-semibold ml-7 line-clamp-1">
        Forum App
      </h1>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? 'active text-accent __navlink_sidenav'
            : 'text-base-content __navlink_sidenav'}
      >
        <IoMdChatbubbles size={35} />
        <span className="hidden text-lg font-semibold lg:block">Threads</span>
      </NavLink>
      <div className="mx-1 dropdown dropdown-end btn py-3 h-16 btn-ghost hover:bg-base-200">
        <div tabIndex={0} role="button" className="flex items-center gap-6 rounded-lg">
          <FiSearch size={35} />
          <span className="font-semibold text-lg hidden lg:block line-clamp-1">
            Search
          </span>
        </div>
        <ul
          tabIndex={0}
          className="mt-7 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-28 md:w-32 lg:w-40"
        >
          <li>
            <button
              onClick={() => openModal('modal_search_user')}
              type="button"
              className="justify-between"
            >
              User
              <CiUser size={20} />
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => openModal('modal_search_category')}
              className="mt-2 justify-between"
            >
              Category
              <CiHashtag size={20} />
            </button>
          </li>
        </ul>
      </div>
      <NavLink
        to="/threads/create"
        className={({ isActive }) =>
          isActive
            ? 'active text-accent __navlink_sidenav'
            : 'text-base-content __navlink_sidenav'}
      >
        <IoCreateOutline size={35} />
        <span className="hidden text-lg font-semibold lg:block">Create</span>
      </NavLink>
      <NavLink
        to="/leaderboards"
        className={({ isActive }) =>
          isActive
            ? 'active text-accent __navlink_sidenav'
            : 'text-base-content __navlink_sidenav'}
      >
        <MdLeaderboard size={35} />
        <span className="hidden text-lg font-semibold lg:block">Lead</span>
      </NavLink>
      <div className="ml-5 dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="avatar btn btn-ghost btn-circle"
        >
          <div className="w-8 rounded-full ring ring-offset-base-100 ring-offset-2">
            <img alt={`avatar/${authUser.name}`} src={authUser.avatar} />
          </div>
        </div>
        <span className="font-semibold text-lg absolute left-[60px] top-2 hidden lg:block line-clamp-1">
          {authUser.name}
        </span>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-28 md:w-32 lg:w-40"
        >
          <li>
            <button type="button" className="justify-between">
              Theme
              <Swap />
            </button>
          </li>
          <li>
            <NavLink
              to={`/${authUser.name}/${authUser.id}/profile`}
              className="mt-2 justify-between"
            >
              Profile
              <FaUserTie className="w-5 h-5" />
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              onClick={() => onLogout()}
              className="mt-2 justify-between"
            >
              Logout
              <AiOutlineLogout className="w-5 h-5 text-error" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
