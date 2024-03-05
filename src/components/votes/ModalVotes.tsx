import React from 'react';
// import { Link } from 'react-router-dom';


type ModalVotesProps = {
  // threadId: string
};

const ModalVotes: React.FC<ModalVotesProps> = () => {

  const looping = 3
  const loop = new Array(looping).fill(null)

  return (
    <>
      <dialog id='my_modal_2' className='modal'>
        <div className='modal-box overflow-auto'>
          {loop.map((_, index) => (
            <div key={index}>{ index + 1}</div>
          ))}
          {/* {usersUpVotes && usersUpVotes.map((user) => ( */}
            {/* <div className='avatar flex gap-5 items-center justify-between'>
              <div className='w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                <img src={avatar} alt={`avatar-${name}`} />
              </div>
              <span>{name}</span>
              <Link to={`/${name}/${id}/posts`} className='btn btn-outline btn-accent'>
                Detail
              </Link>
            </div> */}
          {/* ))} */}
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ModalVotes;
