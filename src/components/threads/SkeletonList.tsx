import React from 'react';

type SkeletonListProps = {
  loop: number;
};

const SkeletonList: React.FC<SkeletonListProps> = ({ loop }) => {
  const looping = new Array(loop).fill(null);
  return (
    <>
      {looping.map((_, index) => (
        <div key={index} className='flex flex-col gap-4 w-full'>
          <div className='flex gap-4 items-center'>
            <div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
            <div className='flex flex-col gap-4'>
              <div className='skeleton h-4 w-56'></div>
            </div>
          </div>
          <div className='skeleton h-4 w-1/2'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='flex gap-5'>
            <div className='skeleton h-7 w-7'></div>
            <div className='skeleton h-7 w-7'></div>
            <div className='skeleton h-7 w-7'></div>
          </div>
          <div className='divider'></div>
        </div>
      ))}
    </>
  );
};

export default SkeletonList;
