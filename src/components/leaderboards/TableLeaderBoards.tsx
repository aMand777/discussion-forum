import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useUser from '../../hook/useUser.ts';
import TableLeaderBoardsSkeleton from './TableLeaderboardsSkeleton.tsx';
import leaderboards from '../../services/leaderboards.services.ts';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface LeaderBoard {
  score: number;
  user: User;
}

function TableLeaderBoards() {
  const [leaderBoards, setLeaderBoards] = React.useState<LeaderBoard[]>();
  const { authUser } = useUser();

  const { isLoading } = useQuery({
    queryKey: ['GET_LEADERBOARDS'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: async (): Promise<any> => {
      const response = await leaderboards.getAll();
      if (response.status === 'success') {
        setLeaderBoards(response.data.leaderboards);
      }
      return response.status;
    },
    refetchInterval: 5000,
  });

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="bg-base-200">
            <th>No</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        {leaderBoards && leaderBoards.length > 0
          ? leaderBoards.map((leaderboard, index) => (
            <tbody key={leaderboard.user.id}>
              <tr>
                <th>{index + 1}</th>
                <td className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="rounded-full w-7 ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={leaderboard.user.avatar}
                        alt={`avatar-${leaderboard.user.name}`}
                      />
                    </div>
                  </div>
                  <span className="text-base font-semibold line-clamp-1">
                    {leaderboard.user.name}
                    {leaderboard.user.id === authUser.id && <span className="ml-1">(You)</span>}
                  </span>
                </td>
                <th>{leaderboard.score}</th>
              </tr>
            </tbody>
          ))
          : isLoading && <TableLeaderBoardsSkeleton loop={10} />}
      </table>
    </div>
  );
}

export default TableLeaderBoards;
