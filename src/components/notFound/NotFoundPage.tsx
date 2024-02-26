import { TbError404 } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <div className='absolute top-0 z-50 w-screen h-screen bg-base-300'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <div className='flex items-center justify-center'>
            <TbError404 size={30} className='text-base-content' />
            <div className='divider divider-horizontal divider-base-content'></div>
            <p className='text-base-content'>This page could not be found.</p>
          </div>
          <Link to='/' className='link link-accent'>
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
