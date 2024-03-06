import useLeaderBoards from '../../hook/useLeaderboards';
import TableLeaderBoardsSkeleton from './TableLeaderboardsSkeleton';

const TableLeaderBoards = () => {
  const { leaderBoards, status } = useLeaderBoards();

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr className='bg-base-200'>
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
                    <td className='flex items-center gap-3'>
                      <div className='avatar'>
                        <div className='rounded-full w-7 ring ring-primary ring-offset-base-100 ring-offset-2'>
                          <img src={leaderboard.user.avatar} />
                        </div>
                      </div>
                      <span className='text-base font-semibold line-clamp-1'>
                        {leaderboard.user.name}
                      </span>
                    </td>
                    <th>{leaderboard.score}</th>
                  </tr>
                </tbody>
              ))
            : status === 'loading' && <TableLeaderBoardsSkeleton loop={10} />}
        </table>
      </div>
    </>
  );
};

export default TableLeaderBoards;
