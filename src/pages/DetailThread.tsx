import React from 'react';
import CardDetailThread from '../components/detailThread/CardDetailThread';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../states/store';
import { getDetailThreadAsync } from '../states/slice/detail-thread-slice';
import { useParams } from 'react-router-dom';

const DetailThread = () => {
  const { threadId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getDetailThreadAsync(threadId));
  }, [dispatch, threadId]);
  return (
    <>
      <CardDetailThread />
    </>
  );
};

export default DetailThread;
