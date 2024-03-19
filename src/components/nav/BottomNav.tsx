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
import useUser from '../../hook/useUser.ts';
import useLogout from '../../hook/useLogout.ts';
import { openModal } from '../../utils/index.ts';
import Swap from './Swap.tsx';

function BottomNav() {
  const { authUser } = useUser();
  const { onLogout } = useLogout();

  return (
    <div className="border-t btm-nav border-base-content">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'active text-accent' : 'text-base-content'}
      >
        <IoMdChatbubbles size={35} />
        <span className="btm-nav-label">Threads</span>
      </NavLink>
      <div className="dropdown dropdown-start">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost hover:bg-base-100"
        >
          <FiSearch size={35} />
          <span className="btm-nav-label">Search</span>
        </div>
        <ul
          tabIndex={0}
          className="-mt-40 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52"
        >
          <li>
            <button
              type="button"
              onClick={() => openModal('modal_search_user')}
              className="justify-between text-lg"
            >
              User
              <CiUser size={20} />
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => openModal('modal_search_category')}
              className="mt-2 justify-between text-lg"
            >
              Category
              <CiHashtag size={20} />
            </button>
          </li>
        </ul>
      </div>
      {/* ========= */}
      <NavLink
        to="/threads/create"
        className={({ isActive }) =>
          isActive ? 'active text-accent' : 'text-base-content'}
      >
        <IoCreateOutline size={35} />
        <span className="btm-nav-label">Create</span>
      </NavLink>
      <NavLink
        to="/leaderboards"
        className={({ isActive }) =>
          isActive ? 'active text-accent' : 'text-base-content'}
      >
        <MdLeaderboard size={35} />
        <span className="btm-nav-label">Lead</span>
      </NavLink>
      <div className="mt-2 dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-8 rounded-full ring ring-offset-base-100 ring-offset-2">
            <img alt={`avatar/${authUser.name}`} src={authUser.avatar} />
          </div>
          <span className="btm-nav-label">{authUser.name.substring(0, 7)}</span>
        </div>
        <ul
          tabIndex={0}
          className="-mt-52 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52"
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

export default BottomNav;
