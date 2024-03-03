import React from 'react';
import { FaStar } from 'react-icons/fa';

type ScoreProps = {
  score: number
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <>
      <div className='shadow stats'>
        <div className='stat'>
          <div className='stat-title'>Score</div>
          <div className='stat-value'>{score}</div>
          <div className='flex stat-desc'>
            {score > 0 && score < 100 && <FaStar className='hidden w-5 h-5 text-accent lg:block' />}
            {score >= 20 && score < 100 && <FaStar className='hidden w-5 h-5 text-accent lg:block' />}
            {score >= 40 && score < 100 && <FaStar className='hidden w-5 h-5 text-accent lg:block' />}
            {score >= 60 && score < 100 && <FaStar className='hidden w-5 h-5 text-accent lg:block' />}
            {score >= 80 && score < 100 && <FaStar className='hidden w-5 h-5 text-accent lg:block' />}
            {score >= 100 && <FaStar className='hidden w-20 h-20 text-yellow-500 lg:block' />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Score;
