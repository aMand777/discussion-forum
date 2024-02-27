import React from 'react'
import CardDetailThread from '../components/threads/CardDetailThread'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../states/store'
import { getDetailThreadAsync } from '../states/slice/detail-thread-slice'
import { useParams } from 'react-router-dom'

const DetailThread = () => {
  const { threadId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { detailThread, authUser } = useSelector((state: RootState) => state);

  React.useEffect(() => {
    dispatch(getDetailThreadAsync(threadId));
  }, [dispatch, threadId]);
  return (
    <>
      <CardDetailThread
        threadId={detailThread.value?.id}
        authUser={authUser.data.id}
        owner={detailThread.value?.owner.name}
        avatar={detailThread.value?.owner.avatar}
        title={detailThread.value?.title}
        body={detailThread.value?.body}
        createdAt={detailThread.value?.createdAt}
        comments={detailThread.value?.comments}
        upVotesBy={detailThread.value?.upVotesBy}
        downVotesBy={detailThread.value?.downVotesBy}
      />
    </>
  );
}

export default DetailThread