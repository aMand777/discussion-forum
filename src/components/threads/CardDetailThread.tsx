// import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { IoHeart, IoHeartDislikeOutline } from 'react-icons/io5';

const CardDetailThread = () => {
  return (
    <>
      <div>
        <div className='items-center gap-5 avatar'>
          <div className='rounded-full w-7 ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
          </div>
          <span>Seventaurus_</span>
          <span className=''>•</span>
          <span className='text-xs'>5 mintes ago</span>
        </div>
        <div className='mb-2 font-semibold'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <div className='font-thin line-clamp-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam corporis iure dolor
          dolorum similique ab aspernatur maiores, repellat quaerat, inventore labore est! Eos
          architecto possimus laboriosam molestias porro ipsa ea?
        </div>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <button
              onClick={undefined}
              className='p-0 rounded-full btn btn-ghost hover:bg-base-100'>
              {/* {isThreadUpVoteByAuthUser ? ( */}
              <IoHeart className='p-0 text-red-500 w-7 h-7' />
              {/* ) : ( */}
              {/* <IoHeartOutline className='w-7 h-7' /> */}
              {/* )} */}
            </button>
            <span>10</span>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={undefined}
              className='p-0 rounded-full btn btn-ghost hover:bg-base-100'>
              {/* {isThreadDownVoteByAuthUser ? ( */}
              {/* <IoHeartDislikeSharp className='text-red-500 w-7 h-7' /> */}
              {/* ) : ( */}
              <IoHeartDislikeOutline className='w-7 h-7' />
              {/* )} */}
            </button>
            <span>15</span>
          </div>
          {/* <Link to='/threaads/detail' className='flex items-center gap-2'> */}
          <AiOutlineComment className='w-7 h-7' />
          <span>21</span>
          {/* </Link> */}
        </div>
        <div className='divider'></div>
      </div>
    </>
  );
};

export default CardDetailThread;
