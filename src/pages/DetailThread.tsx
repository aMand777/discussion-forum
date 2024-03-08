import React from 'react';
import { useParams } from 'react-router-dom';
import CardDetailThread from '../components/detail/CardDetailThread.tsx';
import { useAppDispatch } from '../states/store.ts';
import { getDetailThreadAsync } from '../states/slice/detail-thread-slice.ts';

function DetailThread() {
  const { threadId } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getDetailThreadAsync(threadId || ''));
  }, [dispatch, threadId]);
  return (
    <div className="w-11/12 py-5 mx-auto lg:w-10/12">
      <CardDetailThread />
    </div>
  );
}

export default DetailThread;
