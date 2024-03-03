import React from 'react';
import Score from './Score';

type CardLeaderBoardProps = {
  // id: string;
  name: string;
  email: string;
  avatar: string;
  score: number;
};

const CardLeaderBoard: React.FC<CardLeaderBoardProps> = ({ name, email, avatar, score }) => {
  return (
    <>
      <div className='mb-16 shadow-xl lg:mb-5 card card-side bg-base-100'>
        <div className='flex flex-col items-center card-body md:flex-row'>
          <div className='avatar'>
            <div className='w-32 lg:w-40 mask mask-hexagon'>
              <img src={avatar} alt={`avatar/${name}`} />
            </div>
          </div>
          <div className='flex flex-col items-center w-full'>
          <h2 className='card-title line-clamp-1'>{name}</h2>
          <p className='line-clamp-1'>{email}</p>
          </div>
        </div>
        <div className='justify-end card-actions'>
          <Score score={score} />
        </div>
      </div>
    </>
  );
};

export default CardLeaderBoard;
