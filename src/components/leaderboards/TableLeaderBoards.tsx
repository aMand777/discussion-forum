import useLeaderBoards from '../../hook/useLeaderboards.ts';
import useUser from '../../hook/useUser.ts';
import TableLeaderBoardsSkeleton from './TableLeaderboardsSkeleton.tsx';

function TableLeaderBoards() {
  const { leaderBoards, status } = useLeaderBoards();
  const { authUser } = useUser();

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
        {leaderBoards.length > 0
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
                    {leaderboard.user.id === authUser.id && (
                      <span className="ml-1">(You)</span>
                    )}
                  </span>
                </td>
                <th>{leaderboard.score}</th>
              </tr>
            </tbody>
          ))
          : status === 'loading' && <TableLeaderBoardsSkeleton loop={10} />}
      </table>
    </div>
  );
}

export default TableLeaderBoards;
