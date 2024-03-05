import React from 'react';
import { LuSearchX } from 'react-icons/lu';
import { Link } from 'react-router-dom';

type NotFoundProps = {
  title: string;
};
const NotFound: React.FC<NotFoundProps> = ({ title }) => {
  return (
    <div className='w-screen h-screen absolute bg-base-300 top-0 left-0 z-50'>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center'>
          <LuSearchX size={30} className='text-base-content' />
          <div className='divider divider-horizontal divider-base-content'></div>
          <p className='text-base-content'>{title}</p>
        </div>
        <Link to='/' className='link link-accent'>
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
