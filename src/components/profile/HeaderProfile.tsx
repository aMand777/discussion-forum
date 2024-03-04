import React from 'react';
import { NavLink } from 'react-router-dom';

type HeaderProfileProps = {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
};

const HeaderProfile: React.FC<HeaderProfileProps> = ({ id, name, email, avatar }) => {
  return (
    <div className='relative w-full h-56 border border-base-300'>
      <div className='w-full bg-primary h-1/2'></div>
      <div className='flex flex-col ml-10 -mt-12 avatar'>
        <div className='w-24 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2'>
          {avatar ? (
            <img src={avatar} alt={`/avatar/${name}`} />
          ) : (
            <div className='skeleton w-24 h-24 rounded-full shrink-0'></div>
          )}
        </div>
        {name ? (
          <span className='text-xl font-bold w-24 text-center'>{name}</span>
        ) : (
          <div className='skeleton h-4 w-24 my-2'></div>
        )}
        {email ? (
          <span className='text-xs w-24 text-center'>{email}</span>
        ) : (
          <div className='skeleton h-3 w-24'></div>
        )}
      </div>
      <div className='sticky mt-5 border-b border-base-300 border-x btm-nav'>
        <NavLink
          to={`/${name}/${id}/posts`}
          className={({ isActive }) => (isActive ? 'active text-accent' : '')}>
          <span className='btm-nav-label'>Posts</span>
        </NavLink>
        <NavLink
          to={`/${name}/${id}/upvotes`}
          className={({ isActive }) => (isActive ? 'active text-accent' : '')}>
          <span className='btm-nav-label'>Up Votes</span>
        </NavLink>
        <NavLink
          to={`/${name}/${id}/downvotes`}
          className={({ isActive }) => (isActive ? 'active text-accent' : '')}>
          <span className='btm-nav-label'>Down Votes</span>
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderProfile;
