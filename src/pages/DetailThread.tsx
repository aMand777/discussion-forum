import React from 'react';
import CardDetailThread from '../components/detailThread/CardDetailThread';
import { useAppDispatch } from '../states/store';
import { getDetailThreadAsync } from '../states/slice/detail-thread-slice';
import { useParams } from 'react-router-dom';

const DetailThread = () => {
  const { threadId } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getDetailThreadAsync(threadId || ''));
  }, [dispatch, threadId]);
  return (
    <>
      <div className='w-11/12 py-5 mx-auto lg:w-10/12'>
      <CardDetailThread />
      </div>
    </>
  );
};

export default DetailThread;
