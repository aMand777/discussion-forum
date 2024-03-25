import React from 'react';
import useLeaderBoards from '../hook/useLeaderboards.ts';
import CardLeaderBoard from '../components/leaderboards/CardLeaderBoard.tsx';
import CardLeaderBoardSkeleton from '../components/leaderboards/CardLeaderBoardSkeleton.tsx';
import { useAppDispatch } from '../states/store.ts';
import { getLeaderBoardsAsync } from '../states/slice/leaderboards-slice.ts';

function LeaderBoards() {
  const dispatch = useAppDispatch();
  const { leaderBoards, status } = useLeaderBoards();

  React.useEffect(() => {
    dispatch(getLeaderBoardsAsync());
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 p-5">
      {leaderBoards.length > 0
        ? leaderBoards.map((leaderboard) => (
          <CardLeaderBoard
            key={leaderboard.user.id}
            id={leaderboard.user.id}
            name={leaderboard.user.name}
            email={leaderboard.user.email}
            avatar={leaderboard.user.avatar}
            score={leaderboard.score}
          />
        ))
        : status === 'loading' && <CardLeaderBoardSkeleton loop={10} />}
    </div>
  );
}

export default LeaderBoards;
