import React from 'react';
import { postedAt } from '../../utils'
import { IoHeart, IoHeartDislikeOutline, IoHeartDislikeSharp, IoHeartOutline } from 'react-icons/io5';
import { AiOutlineComment } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser'

type CardThreadProps = {
  avatar?: string
  name?: string
  createdAt: string
  // category: string
  title: string
  body: string
  totalComments: number
  totalUpVotes: number
  totalDownVotes: number
}

const CardThread: React.FC<CardThreadProps> = ({avatar, name, createdAt, title, body, totalComments, totalUpVotes, totalDownVotes}) => {

  return (
    <>
      <div>
        <div className='avatar gap-5 items-center'>
          <div className='w-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src={avatar} />
          </div>
          <span>{name}</span>
          <span className=''>•</span>
          <span className='text-xs'>{postedAt(createdAt)}</span>
        </div>
        <div className='font-semibold mb-2'>{parser(title)}</div>
        <div className='font-thin'>{parser(body)}</div>
        <div className='flex gap-3 items-center'>
          <div className='flex items-center gap-2'>
            <button className='btn btn-ghost p-0 rounded-full hover:bg-base-100'>
              <IoHeart className='w-7 h-7 text-red-500 p-0' />
              <IoHeartOutline className='w-7 h-7' />
            </button>
            <span>{totalUpVotes}</span>
          </div>
          <div className='flex items-center gap-2'>
            <button className='btn btn-ghost p-0 rounded-full hover:bg-base-100'>
              <IoHeartDislikeOutline className='w-7 h-7' />
              <IoHeartDislikeSharp className='w-7 h-7 text-red-500' />
            </button>
            <span>{totalDownVotes}</span>
          </div>
          <Link to='/threaads/detail' className='flex items-center gap-2'>
            <AiOutlineComment className='w-7 h-7' />
            <span>{totalComments}</span>
          </Link>
        </div>
        <div className='divider'></div>
      </div>
    </>
  );
};

export default CardThread;
