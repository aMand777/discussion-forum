import useLeaderBoards from '../../hook/useLeaderboards';

const TableLeaderBoards = () => {
  const { leaderBoards } = useLeaderBoards()

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr className='bg-base-200'>
              <th>No</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          {leaderBoards.map((leaderboard, index) => (
            <tbody key={leaderboard.user.id}>
              {/* row 1 */}
              <tr>
                <th>{index + 1}</th>
                <td className='flex items-center gap-3'>
                  <div className='avatar'>
                    <div className='rounded-full w-7 ring ring-primary ring-offset-base-100 ring-offset-2'>
                      <img src={leaderboard.user.avatar} />
                    </div>
                  </div>
                  <span className='text-base font-semibold line-clamp-1'>{leaderboard.user.name}</span>
                </td>
                <th>{leaderboard.score}</th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default TableLeaderBoards;
